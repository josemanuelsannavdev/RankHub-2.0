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
import com.rankhub.ranking_service.dto.HistoricoDto;
import com.rankhub.ranking_service.dto.HistoricoPlayerDto;
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
public class HistoricoServiceImpl implements HistoricoService {
    
    private final HistoricoRepository historicoRepository;
    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;
    @Override
    public List<HistoricoDto> getAllHistoricos(UUID rankingId) {
        List<Game> games = gameRepository.findAllGamesByRankingId(rankingId);
        List<HistoricoDto> historicosDto= new ArrayList<>();
        for (Game game : games) {
            List<Historico> historicosGame = historicoRepository.findByGameId(game.getId());
            //Mapear historico a HistoricoPlayerDto
            List<HistoricoPlayerDto> historicoPlayers = historicosGame.stream().map(historico -> {
                HistoricoPlayerDto playerDto = new HistoricoPlayerDto();
                playerDto.setPlayerId(historico.getPlayerId());
                playerDto.setTotalPoints(historico.getTotalPoints());
                playerDto.setObtainedPoints(historico.getObtainedPoints());
                playerDto.setPlayerName(playerRepository.getPlayerById(historico.getPlayerId()).getName());
                playerDto.setPosition(historico.getPosition());

                return playerDto;
            }).collect(Collectors.toList());
            //Crear HistoricoDto para el juego
            HistoricoDto historicoDto = new HistoricoDto();
            historicoDto.setGameId(game.getId());
            historicoDto.setGameName(game.getName());
            historicoDto.setDate(game.getDate());
            historicoDto.setPlayers(historicoPlayers);
            historicoDto.setType(game.getType().name());
            //Añadir HistoricoDto a la lista de historicosDto
            historicosDto.add(historicoDto);

        }   
        
        return historicosDto;
    }    
    
}
