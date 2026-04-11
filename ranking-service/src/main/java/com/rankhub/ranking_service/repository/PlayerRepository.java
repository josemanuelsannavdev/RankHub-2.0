package com.rankhub.ranking_service.repository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.entity.Player;

@Repository
@RequiredArgsConstructor
public class PlayerRepository {

    private final PlayerJpaRespository playerJpaRespository;

    public List<Player> getAllPlayersOfRanking(UUID rankingId) {
        return playerJpaRespository.getAllPlayersOfRanking(rankingId);
    }

    public Player getPlayerById(UUID id) {
        return playerJpaRespository.findById(id).orElse(null);
    }

    public Player save(Player player) {
        return playerJpaRespository.save(player);
    }

    public void deleteById(UUID id) {
        playerJpaRespository.deleteById(id);
    }

}
