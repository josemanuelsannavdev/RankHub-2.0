package com.rankhub.ranking_service.repository;


import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.entity.Game;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class GameRepository {
    
    private final GameJpaRespository gameJpaRespository;
 
    public List<Game> findAllGamesByRankingId(UUID rankingId) {
        return gameJpaRespository.findAllGamesByRankingId(rankingId);
    }

    public Game save(Game game) {
        return gameJpaRespository.save(game);
    }
}
