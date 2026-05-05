package com.rankhub.ranking_service.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rankhub.ranking_service.dto.DuelGameDto;
import com.rankhub.ranking_service.dto.IndividualGameDto;
import com.rankhub.ranking_service.dto.ParticipantDto;
import com.rankhub.ranking_service.dto.TeamDto;
import com.rankhub.ranking_service.dto.TeamGameDto;
import com.rankhub.ranking_service.dto.TeamMemberDto;
import com.rankhub.ranking_service.entity.Duel;
import com.rankhub.ranking_service.entity.Game;
import com.rankhub.ranking_service.entity.Historico;
import com.rankhub.ranking_service.entity.Participant;
import com.rankhub.ranking_service.entity.Player;
import com.rankhub.ranking_service.entity.Team;
import com.rankhub.ranking_service.entity.TeamMember;
import com.rankhub.ranking_service.entity.utils.GameType;
import com.rankhub.ranking_service.mapper.GameMapper;
import com.rankhub.ranking_service.mapper.ParticipantMapper;
import com.rankhub.ranking_service.mapper.TeamMapper;
import com.rankhub.ranking_service.mapper.TeamMemberMapper;
import com.rankhub.ranking_service.mapper.PlayerMapper;
import com.rankhub.ranking_service.repository.DuelRepository;
import com.rankhub.ranking_service.repository.GameRepository;
import com.rankhub.ranking_service.repository.HistoricoRepository;
import com.rankhub.ranking_service.repository.ParticipantRepository;
import com.rankhub.ranking_service.repository.PlayerRepository;
import com.rankhub.ranking_service.repository.TeamMemberRepository;
import com.rankhub.ranking_service.repository.TeamRepository;
import com.rankhub.ranking_service.request.DuelGameRequest;
import com.rankhub.ranking_service.request.DuelParticipantsRequest;
import com.rankhub.ranking_service.request.IndividualGameRequest;
import com.rankhub.ranking_service.request.TeamMemberRequest;
import com.rankhub.ranking_service.request.TeamGameRequest;
import com.rankhub.ranking_service.request.TeamRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;
    private final ParticipantRepository participantRepository;
    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final GameMapper gameMapper;
    private final ParticipantMapper participantMapper;
    private final TeamMapper teamMapper;
    private final TeamMemberMapper teamMemberMapper;
    private final PlayerMapper playerMapper;
    private final DuelRepository duelRepository;
    private final HistoricoRepository historicoRepository;

    @Override
    @Transactional
    public IndividualGameDto createIndividualGame(IndividualGameRequest request) {

        // Crear el juego y guardarlo para obtener su id generado por la base de datos
        Game game = gameRepository.save(gameMapper.toEntity(request, GameType.INDIVIDUAL_GAME));

        // Obtiene los participantes. Hace el getParticipants que devuelve el
        // ParticipantRequest,
        // y por cada uno de ellos hace el map a entidad Participant,
        // asignándole el id del juego al que pertenecen
        List<Participant> participants = request.getParticipants().stream()
                .map(participantRequest -> participantMapper.toEntity(participantRequest, game.getId()))
                .toList();

        // Guarda los participantes en la base de datos y obtiene la lista de
        // participantes
        // con el id generado por la base de datos
        List<Participant> persistedParticipants = participantRepository.saveAll(participants);
        addPointsToAssociatedPlayersIndividual(persistedParticipants);

        crearHistoricoForIndividualGame(persistedParticipants, request.getRankingId());

        // Convertir los participantes guardados a ParticipantDto
        // para luego convertir el juego a IndividualGameDto
        List<ParticipantDto> participantsDto = persistedParticipants.stream()
                .map(participantMapper::toDto)
                .toList();

        return gameMapper.toIndividualGameDto(game, participantsDto);
    }

    private void addPointsToAssociatedPlayersIndividual(List<Participant> participants) {

        for (Participant participant : participants) {
            if (participant.getPlayerId() == null) {
                continue; // Si no hay playerId, no podemos asignar puntos, así que saltamos este
                          // participante
            }
            Player player = playerRepository.getPlayerById(participant.getPlayerId());
            if (player == null) {
                throw new IllegalArgumentException("Jugador no encontrado: " + participant.getPlayerId());
            }

            double currentPoints = player.getPoints() != null ? player.getPoints() : 0.0;
            player.setPoints(currentPoints + participant.getPoints());

            if (participant.getPosition() == 1) {
                player.setGamesWon(player.getGamesWon() + 1);
            }
            if (participant.getPosition() == participants.size()) {
                player.setGamesLost(player.getGamesLost() + 1);
            }
            player.setGamesPlayed(player.getGamesPlayed() + 1);
            playerRepository.save(player);

        }
    }

    private void crearHistoricoForIndividualGame(List<Participant> participants, UUID rankingId) {
        List<Player> players = playerRepository.getAllPlayersOfRanking(rankingId);
        UUID gameId = participants.get(0).getGameId(); // Asumimos que todos los participantes pertenecen al mismo juego
        for (Player player : players) {
            Participant participant = participants.stream()
                    .filter(p -> player.getId().equals(p.getPlayerId()))
                    .findFirst()
                    .orElse(null);

            if (participant != null) {// si aparece en la lista de participantes
                Historico historico = new Historico();
                historico.setGameId(gameId);
                historico.setPlayerId(player.getId());
                historico.setTotalPoints(player.getPoints());
                historico.setObtainedPoints((double) participant.getPoints());
                historicoRepository.save(historico);
            } else {
                // Si el jugador no participó en el juego, también podríamos querer crear un
                // histórico con 0 puntos obtenidos
                Historico historico = new Historico();
                historico.setGameId(gameId); // Asignamos el id del juego aunque no haya participado
                historico.setPlayerId(player.getId());
                historico.setTotalPoints(player.getPoints());
                historico.setObtainedPoints(null);
                historicoRepository.save(historico);
            }
        }

    }

    @Override
    @Transactional
    public TeamGameDto createTeamGame(TeamGameRequest request) {

        // Creamos el juego y lo guardamos para obtener su id generado por la base de
        // datos
        Game game = gameRepository.save(gameMapper.toEntity(request, GameType.TEAM_GAME));

        // Convertimos los equipos que nos han llegado en la request a entidades Team,
        // asignándoles el id del juego al que pertenecen
        List<Team> teamsToPersist = request.getTeams().stream()
                .map(teamRequest -> teamMapper.toEntity(teamRequest, game.getId()))
                .toList();

        // Los equipos que se han guardado y han devuelto el id generado por la base de
        // datos
        List<Team> persistedTeams = teamRepository.saveAll(teamsToPersist);

        // Los miembros de los equipos que se van a guardar, asignándoles el id del
        // equipo al que pertenecen
        List<TeamMember> membersToPersist = new ArrayList<>();

        // Vamos a mirar los equipos
        for (int i = 0; i < request.getTeams().size(); i++) {
            // miramos el equipo "i" que nos ha llegado en la request
            TeamRequest teamRequest = request.getTeams().get(i);
            // miramos el equipo "i" que se ha guardado en la base de datos y que tiene el
            // id generado
            Team persistedTeam = persistedTeams.get(i);
            // Del teamRequest obtenemos los miembros del equipo, y
            // por cada miembro creamos una entidad TeamMember asignándole el id del equipo
            // al que pertenecen
            for (TeamMemberRequest memberRequest : teamRequest.getMembers()) {
                membersToPersist.add(teamMemberMapper.toEntity(memberRequest, persistedTeam.getId()));
            }
        }

        List<TeamMember> persistedMembers = teamMemberRepository.saveAll(membersToPersist);

        addPointsToAssociatedPlayersTeam(persistedTeams, persistedMembers);
        crearHistoricoForTeamGame(persistedTeams, persistedMembers, request.getRankingId());
        // Agrupamos en un Map los miembros por el id del equipo al que pertenecen,
        // para luego poder asignar a cada equipo su lista de miembros a la hora de
        // convertir el juego a TeamGameDto
        Map<UUID, List<TeamMemberDto>> membersByTeamId = persistedMembers.stream()
                .collect(Collectors.groupingBy(
                        TeamMember::getTeamId,
                        Collectors.mapping(teamMemberMapper::toDto, Collectors.toList())));

        List<TeamDto> teamsDto = persistedTeams.stream()
                .map(team -> teamMapper.toDto(team,
                        membersByTeamId.getOrDefault(team.getId(), Collections.emptyList())))
                .toList();

        return gameMapper.toTeamGameDto(game, teamsDto);
    }

    private void addPointsToAssociatedPlayersTeam(List<Team> teams, List<TeamMember> teamMembers) {
        for (Team team : teams) {
            List<TeamMember> membersOfTeam = teamMembers.stream()
                    .filter(member -> member.getTeamId().equals(team.getId()))
                    .toList();

            for (TeamMember member : membersOfTeam) {
                if (member.getPlayerId() == null) {
                    continue; // Si no hay playerId, no podemos asignar puntos, así que saltamos este
                              // miembro
                }
                Player player = playerRepository.getPlayerById(member.getPlayerId());
                if (player == null) {
                    throw new IllegalArgumentException("Jugador no encontrado: " + member.getPlayerId());
                }

                double currentPoints = player.getPoints() != null ? player.getPoints() : 0.0;
                player.setPoints(currentPoints + team.getPoints());
                playerRepository.save(player);

            }
        }
    }

    private void crearHistoricoForTeamGame(List<Team> teams, List<TeamMember> teamMembers, UUID rankingId) {
        List<Player> players = playerRepository.getAllPlayersOfRanking(rankingId);
        UUID gameId = teams.get(0).getGameId(); // Asumimos que todos los equipos pertenecen al mismo juego
        for (Player player : players) {
            TeamMember member = teamMembers.stream()
                    .filter(m -> player.getId().equals(m.getPlayerId()))
                    .findFirst()
                    .orElse(null);

            if (member != null) {// si aparece en la lista de miembros de equipos
                Historico historico = new Historico();
                historico.setGameId(gameId);
                historico.setPlayerId(player.getId());
                historico.setTotalPoints(player.getPoints());
                // obtenemos el equipo al que pertenece ese miembro para saber los puntos que ha
                // obtenido
                Team teamOfMember = teams.stream()
                        .filter(t -> t.getId().equals(member.getTeamId()))
                        .findFirst()
                        .orElse(null);
                if (teamOfMember != null) {
                    historico.setObtainedPoints((double) teamOfMember.getPoints());
                } else {
                    historico.setObtainedPoints(null);
                }
                historicoRepository.save(historico);
            } else {
                // Si el jugador no participó en el juego, también podríamos querer crear un
                // histórico con 0 puntos obtenidos
                Historico historico = new Historico();
                historico.setGameId(gameId); // Asignamos el id del juego aunque no haya participado
                historico.setPlayerId(player.getId());
                historico.setTotalPoints(player.getPoints());
                historico.setObtainedPoints(null);
                historicoRepository.save(historico);
            }
        }

    }

    @Override
    public DuelGameDto createDuelGame(DuelGameRequest request) {
        Game game = gameRepository.save(gameMapper.toEntity(request, GameType.DUEL_GAME));
        // obtener ganador y perdedor de la request, asignarles los puntos
        // correspondientes, y actualizar sus puntos en la base de datos
        DuelParticipantsRequest participantsRequest = request.getParticipants();

        Duel duel = new Duel();
        duel.setGameId(game.getId());
        duel.setWinnerId(participantsRequest.getWinnerId());
        duel.setLoserId(participantsRequest.getLoserId());
        duel.setBet(participantsRequest.getBet());
        duelRepository.save(duel);

        assignPointsToPlayersInDuel(participantsRequest.getWinnerId(), participantsRequest.getLoserId(),
                participantsRequest.getBet());

        crearHistoricoForDuelGame(participantsRequest.getWinnerId(), participantsRequest.getLoserId(),
                request.getRankingId(), game.getId(), participantsRequest.getBet());
        return gameMapper.toDuelGameDto(game);
    }

    public void assignPointsToPlayersInDuel(UUID winnerId, UUID loserId, int bet) {
        Player winner = playerRepository.getPlayerById(winnerId);
        Player loser = playerRepository.getPlayerById(loserId);

        if (winner == null || loser == null) {
            throw new IllegalArgumentException(
                    "Jugador no encontrado. WinnerId: " + winnerId + ", LoserId: " + loserId);
        }

        double winnerCurrentPoints = winner.getPoints();
        double loserCurrentPoints = loser.getPoints();

        winner.setPoints(winnerCurrentPoints + bet);
        loser.setPoints(loserCurrentPoints - bet);

        playerRepository.save(winner);
        playerRepository.save(loser);

    }

    private void crearHistoricoForDuelGame(UUID winnerId, UUID loserId, UUID rankingId, UUID gameId, int bet) {
        List<Player> players = playerRepository.getAllPlayersOfRanking(rankingId);

        for (Player player : players) {
            Historico historico = new Historico();
            historico.setGameId(gameId);
            historico.setPlayerId(player.getId());
            historico.setTotalPoints(player.getPoints());
            if (player.getId().equals(winnerId)) {
                historico.setObtainedPoints((double) bet);
            } else if (player.getId().equals(loserId)) {
                historico.setObtainedPoints((double) -bet);
            } else {
                historico.setObtainedPoints(null);
            }
            historicoRepository.save(historico);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Object> getAllGamesDetailed(UUID rankingId) {
        List<Game> games = gameRepository.findAllGamesByRankingId(rankingId);
        if (games == null || games.isEmpty()) {
            return Collections.emptyList();
        }

        // Preload players of the ranking to avoid many DB calls
        List<Player> players = playerRepository.getAllPlayersOfRanking(rankingId);
        Map<UUID, Player> playersById = players.stream()
                .collect(Collectors.toMap(Player::getId, p -> p));

        List<Object> result = new ArrayList<>();

        // INDIVIDUAL GAMES
        List<UUID> individualGameIds = games.stream()
                .filter(g -> g.getType() == GameType.INDIVIDUAL_GAME)
                .map(Game::getId)
                .toList();

        List<Participant> participants = individualGameIds.isEmpty() ? Collections.emptyList()
                : participantRepository.findByGameIdIn(individualGameIds);

        Map<UUID, List<ParticipantDto>> participantsByGameId = participants.stream()
                .collect(Collectors.groupingBy(Participant::getGameId,
                        Collectors.mapping(participantMapper::toDto, Collectors.toList())));

        // attach player info to participant DTOs
        for (List<ParticipantDto> pList : participantsByGameId.values()) {
            for (ParticipantDto pd : pList) {
                if (pd.getPlayerId() != null) {
                    Player player = playersById.get(pd.getPlayerId());
                    if (player != null) {
                        pd.setPlayer(playerMapper.toDto(player));
                    }
                }
            }
        }

        // Build individual game DTOs
        for (Game game : games) {
            if (game.getType() == GameType.INDIVIDUAL_GAME) {
                List<ParticipantDto> partDtos = participantsByGameId.getOrDefault(game.getId(),
                        Collections.emptyList());
                result.add(gameMapper.toIndividualGameDto(game, partDtos));
            }
        }

        // TEAM GAMES
        List<UUID> teamGameIds = games.stream()
                .filter(g -> g.getType() == GameType.TEAM_GAME)
                .map(Game::getId)
                .toList();

        List<Team> teams = teamGameIds.isEmpty() ? Collections.emptyList() : teamRepository.findByGameIdIn(teamGameIds);
        List<UUID> teamIds = teams.stream().map(Team::getId).toList();
        List<TeamMember> members = teamIds.isEmpty() ? Collections.emptyList()
                : teamMemberRepository.findByTeamIdIn(teamIds);

        Map<UUID, List<TeamMemberDto>> membersByTeamId = members.stream()
                .collect(Collectors.groupingBy(TeamMember::getTeamId,
                        Collectors.mapping(teamMemberMapper::toDto, Collectors.toList())));

        // attach player info to team member DTOs
        for (List<TeamMemberDto> mList : membersByTeamId.values()) {
            for (TeamMemberDto md : mList) {
                if (md.getPlayerId() != null) {
                    Player player = playersById.get(md.getPlayerId());
                    if (player != null) {
                        md.setPlayer(playerMapper.toDto(player));
                    }
                }
            }
        }

        Map<UUID, List<Team>> teamsByGameId = teams.stream()
                .collect(Collectors.groupingBy(Team::getGameId));

        for (Game game : games) {
            if (game.getType() == GameType.TEAM_GAME) {
                List<Team> teamsOfGame = teamsByGameId.getOrDefault(game.getId(), Collections.emptyList());
                List<TeamDto> teamsDto = teamsOfGame.stream()
                        .map(team -> teamMapper.toDto(team,
                                membersByTeamId.getOrDefault(team.getId(), Collections.emptyList())))
                        .toList();
                result.add(gameMapper.toTeamGameDto(game, teamsDto));
            }
        }

        // DUEL GAMES
        List<UUID> duelGameIds = games.stream()
                .filter(g -> g.getType() == GameType.DUEL_GAME)
                .map(Game::getId)
                .toList();

        List<Duel> duels = duelGameIds.isEmpty() ? Collections.emptyList() : duelRepository.findByGameIdIn(duelGameIds);
        Map<UUID, Duel> duelByGameId = duels.stream().collect(Collectors.toMap(Duel::getGameId, d -> d));

        for (Game game : games) {
            if (game.getType() == GameType.DUEL_GAME) {
                Duel duel = duelByGameId.get(game.getId());
                DuelGameDto dto = gameMapper.toDuelGameDto(game);
                if (duel != null) {
                    if (duel.getWinnerId() != null) {
                        Player winner = playersById.get(duel.getWinnerId());
                        if (winner != null)
                            dto.setWinner(playerMapper.toDto(winner));
                    }
                    if (duel.getLoserId() != null) {
                        Player loser = playersById.get(duel.getLoserId());
                        if (loser != null)
                            dto.setLoser(playerMapper.toDto(loser));
                    }
                    dto.setBet(duel.getBet());
                }
                result.add(dto);
            }
        }

        return result;
    }

}
