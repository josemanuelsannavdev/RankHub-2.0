package com.rankhub.ranking_service.service;


import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rankhub.ranking_service.dto.HistoricoDto;
import com.rankhub.ranking_service.dto.HistoricoPlayerDto;

import com.rankhub.ranking_service.entity.Game;
import com.rankhub.ranking_service.entity.Historico;

import com.rankhub.ranking_service.repository.GameRepository;
import com.rankhub.ranking_service.repository.HistoricoRepository;
import com.rankhub.ranking_service.repository.PlayerRepository;


import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HistoricoServiceImpl implements HistoricoService {
    
    private final HistoricoRepository historicoRepository;
    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;
    @Override
    public List<HistoricoDto> getAllHistoricos(UUID rankingId) {
        List<Game> games = gameRepository.findAllGamesByRankingId(rankingId);
        if (games.isEmpty()) {
            return Collections.emptyList();
        }

        List<UUID> gameIds = games.stream()
                .map(Game::getId)
                .toList();

        Map<UUID, String> playerNamesById = playerRepository.getPlayersByIds(
                historicoRepository.findByGameIdIn(gameIds).stream()
                        .map(Historico::getPlayerId)
                        .distinct()
                        .toList())
                .stream()
                .collect(Collectors.toMap(Player -> Player.getId(), Player -> Player.getName()));

        Map<UUID, List<Historico>> historicosByGameId = historicoRepository.findByGameIdIn(gameIds).stream()
                .collect(Collectors.groupingBy(Historico::getGameId));

        List<HistoricoDto> historicosDto= new ArrayList<>();
        for (Game game : games) {
            List<Historico> historicosGame = historicosByGameId.getOrDefault(game.getId(), Collections.emptyList());
            //Mapear historico a HistoricoPlayerDto
            List<HistoricoPlayerDto> historicoPlayers = historicosGame.stream().map(historico -> {
                HistoricoPlayerDto playerDto = new HistoricoPlayerDto();
                playerDto.setPlayerId(historico.getPlayerId());
                playerDto.setTotalPoints(historico.getTotalPoints());
                playerDto.setObtainedPoints(historico.getObtainedPoints());
                playerDto.setPlayerName(playerNamesById.get(historico.getPlayerId()));
                playerDto.setPosition(historico.getPosition());

                return playerDto;
            }).toList();
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
