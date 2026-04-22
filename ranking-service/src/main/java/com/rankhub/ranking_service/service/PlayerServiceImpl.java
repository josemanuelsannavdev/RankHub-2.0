package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rankhub.ranking_service.entity.Player;
import com.rankhub.ranking_service.repository.PlayerRepository;
import com.rankhub.ranking_service.request.PlayerRequest;

@Service
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepository;

    public PlayerServiceImpl(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public List<Player> getAllPlayersOfRanking(UUID rankingId) {
        return playerRepository.getAllPlayersOfRanking(rankingId);
    }

    @Override
    public Player getPlayerById(UUID id) {
        Player player = playerRepository.getPlayerById(id);
        if (player == null) {
            throw new IllegalArgumentException("Jugador no encontrado: " + id);
        }
        return player;
    }

    @Override
    @Transactional
    public Player createPlayer(PlayerRequest playerRequest) {
        String normalizedName = playerRequest.getName() != null ? playerRequest.getName().trim() : null;

        if (normalizedName != null && playerRepository.existsByNameIgnoreCase(normalizedName)) {
            throw new IllegalArgumentException("Player ya existente, cambiar nombre");
        }

        return playerRepository.save(Player.builder()
                .name(normalizedName)
                .gamesLost(0)
                .gamesWon(0)
                .gamesPlayed(0)
                .points(0.0)
                .image(playerRequest.getImage())
                .rankingId(playerRequest.getRankingId())
                .build());
    }

    @Override
    @Transactional
    public Player updatePlayer(UUID playerId, PlayerRequest playerRequest) {
        Player existingPlayer = getPlayerById(playerId);
        existingPlayer.setName(playerRequest.getName() != null ? playerRequest.getName().trim() : null);
        existingPlayer.setGamesPlayed(playerRequest.getGamesPlayed() != null ? playerRequest.getGamesPlayed() : 0);
        existingPlayer.setGamesLost(playerRequest.getGamesLost() != null ? playerRequest.getGamesLost() : 0);
        existingPlayer.setGamesWon(playerRequest.getGamesWon() != null ? playerRequest.getGamesWon() : 0);
        existingPlayer.setPoints(playerRequest.getPoints() != null ? playerRequest.getPoints() : 0.0);
        existingPlayer.setImage(playerRequest.getImage());
        return playerRepository.save(existingPlayer);
    }

    @Override
    @Transactional
    public Player patchPlayer(UUID playerId, PlayerRequest playerRequest) {
        Player existingPlayer = getPlayerById(playerId);
        if (playerRequest.getName() != null) {
            existingPlayer.setName(playerRequest.getName().trim());
        }
        return playerRepository.save(existingPlayer);
    }

}