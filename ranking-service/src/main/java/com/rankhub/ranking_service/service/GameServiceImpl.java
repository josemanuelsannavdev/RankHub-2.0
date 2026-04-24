package com.rankhub.ranking_service.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rankhub.ranking_service.dto.IndividualGameDto;
import com.rankhub.ranking_service.dto.ParticipantDto;
import com.rankhub.ranking_service.dto.TeamDto;
import com.rankhub.ranking_service.dto.TeamGameDto;
import com.rankhub.ranking_service.dto.TeamMemberDto;
import com.rankhub.ranking_service.entity.Game;
import com.rankhub.ranking_service.entity.Participant;
import com.rankhub.ranking_service.entity.Team;
import com.rankhub.ranking_service.entity.TeamMember;
import com.rankhub.ranking_service.entity.utils.GameType;
import com.rankhub.ranking_service.mapper.GameMapper;
import com.rankhub.ranking_service.mapper.ParticipantMapper;
import com.rankhub.ranking_service.mapper.TeamMapper;
import com.rankhub.ranking_service.mapper.TeamMemberMapper;
import com.rankhub.ranking_service.repository.GameRepository;
import com.rankhub.ranking_service.repository.ParticipantRepository;
import com.rankhub.ranking_service.repository.TeamMemberRepository;
import com.rankhub.ranking_service.repository.TeamRepository;
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
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final GameMapper gameMapper;
    private final ParticipantMapper participantMapper;
    private final TeamMapper teamMapper;
    private final TeamMemberMapper teamMemberMapper;

    @Override
    public List<Game> getAllGamesOfRanking(UUID rankingId) {
        return gameRepository.findAllGamesByRankingId(rankingId);
    }

    @Override
    @Transactional
    public IndividualGameDto createIndividualGame(IndividualGameRequest request) {

        Game game = gameRepository.save(gameMapper.toEntity(request, GameType.INDIVIDUAL_GAME));

        List<Participant> participants = request.getParticipants().stream()
                .map(participantRequest -> participantMapper.toEntity(participantRequest, game.getId()))
                .toList();

        List<Participant> persistedParticipants = participantRepository.saveAll(participants);
        List<ParticipantDto> participantsDto = persistedParticipants.stream()
                .map(participantMapper::toDto)
                .toList();

        return gameMapper.toIndividualGameDto(game, participantsDto);
    }

    @Override
    @Transactional
    public TeamGameDto createTeamGame(TeamGameRequest request) {


        Game game = gameRepository.save(gameMapper.toEntity(request, GameType.TEAM_GAME));

        List<Team> teamsToPersist = request.getTeams().stream()
            .map(teamRequest -> teamMapper.toEntity(teamRequest, game.getId()))
            .toList();

            //Los equipos que se han guardado y han devuelto el id generado por la base de datos
        List<Team> persistedTeams = teamRepository.saveAll(teamsToPersist);

        //Los miembros de los equipos que se van a guardar, asignándoles el id del equipo al que pertenecen
        List<TeamMember> membersToPersist = new ArrayList<>();

        //Vamos a mirar los equipos
        for (int i = 0; i < request.getTeams().size(); i++) {
            //miramos el equipo "i" que nos ha llegado en la request
            TeamRequest teamRequest = request.getTeams().get(i);
            //miramos el equipo "i" que se ha guardado en la base de datos y que tiene el id generado
            Team persistedTeam = persistedTeams.get(i);
            //Del teamRequest obtenemos los miembros del equipo, y 
            // por cada miembro creamos una entidad TeamMember asignándole el id del equipo al que pertenecen
            for (TeamMemberRequest memberRequest : teamRequest.getMembers()) {
                membersToPersist.add(teamMemberMapper.toEntity(memberRequest, persistedTeam.getId()));
            }
        }

        List<TeamMember> persistedMembers = teamMemberRepository.saveAll(membersToPersist);

        Map<UUID, List<TeamMemberDto>> membersByTeamId = persistedMembers.stream()
                .collect(Collectors.groupingBy(
                        TeamMember::getTeamId,
                        Collectors.mapping(teamMemberMapper::toDto, Collectors.toList())));

        List<TeamDto> teamsDto = persistedTeams.stream()
                .map(team -> teamMapper.toDto(team, membersByTeamId.getOrDefault(team.getId(), Collections.emptyList())))
                .toList();

        return gameMapper.toTeamGameDto(game, teamsDto);
    }

    

}
