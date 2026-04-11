package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import com.rankhub.ranking_service.entity.Player;
import com.rankhub.ranking_service.request.PlayerRequest;

public interface PlayerService {

    List<Player> getAllPlayersOfRanking(UUID rankingId);

    Player getPlayerById(UUID id);

    Player createPlayer(PlayerRequest playerRequest);

    Player updatePlayer(UUID playerId, PlayerRequest playerRequest);

    Player patchPlayer(UUID playerId, PlayerRequest playerRequest);
    
} 