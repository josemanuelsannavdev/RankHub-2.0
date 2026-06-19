package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.rankhub.ranking_service.dto.PlayerDto;
import com.rankhub.ranking_service.request.PlayerRequest;

public interface PlayerService {

    List<PlayerDto> getAllPlayersOfRanking(UUID rankingId);

    PlayerDto getPlayerById(UUID id);

    PlayerDto createPlayer(PlayerRequest playerRequest);

    PlayerDto updatePlayer(UUID playerId, PlayerRequest playerRequest);

    PlayerDto patchPlayer(UUID playerId, PlayerRequest playerRequest);

    void deletePlayer(UUID playerId);

    void addPoints(Map<UUID, Double> playerAndPointsMap);
    
} 