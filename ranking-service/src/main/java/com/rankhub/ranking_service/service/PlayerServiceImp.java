package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import com.rankhub.ranking_service.entity.Player;
import com.rankhub.ranking_service.repository.PlayerRepository;
import com.rankhub.ranking_service.request.PlayerRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlayerServiceImp implements PlayerService {

    private final PlayerRepository playerRepository;

    @Override
    public List<Player> getAllPlayersOfRanking(UUID rankingId) {
        return playerRepository.getAllPlayersOfRanking(rankingId);
    }

    @Override
    public Player getPlayerById(UUID id) {
        return playerRepository.getPlayerById(id);
    }

    @Override
    public Player createPlayer(PlayerRequest playerRequest) {
        return playerRepository.save(Player.builder()
                .name(playerRequest.getName())
                .build());
    }

    @Override
    public Player updatePlayer(UUID playerId, PlayerRequest playerRequest) {
        Player existingPlayer = playerRepository.getPlayerById(playerId);
        if (existingPlayer == null) {
            return null;
        }
        existingPlayer.setName(playerRequest.getName());
        return playerRepository.save(existingPlayer);
    }

    @Override
    public Player patchPlayer(UUID playerId, PlayerRequest playerRequest) {
        Player existingPlayer = playerRepository.getPlayerById(playerId);
        if (existingPlayer == null) {
            return null;
        }
        if(playerRequest.getName() != null) {
            existingPlayer.setName(playerRequest.getName());
        }
        existingPlayer.setName(playerRequest.getName());
        return playerRepository.save(existingPlayer);
    }
}
