package com.rankhub.ranking_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.entity.Player;

import lombok.RequiredArgsConstructor;

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

    public List<Player> getPlayersByIds(List<UUID> ids) {
        return playerJpaRespository.findAllById(ids);
    }

    public Player save(Player player) {
        return playerJpaRespository.save(player);
    }

    public List<Player> saveAll(List<Player> players) {
        return playerJpaRespository.saveAll(players);
    }

    public boolean existsByNameIgnoreCase(String name) {
        return playerJpaRespository.existsByNameIgnoreCase(name);
    }

    public boolean existsByIdAndRankingId(UUID id, UUID rankingId) {
        return playerJpaRespository.existsByIdAndRankingId(id, rankingId);
    }

    public void deleteById(UUID playerId) {
        playerJpaRespository.deleteById(playerId);
    }

}
