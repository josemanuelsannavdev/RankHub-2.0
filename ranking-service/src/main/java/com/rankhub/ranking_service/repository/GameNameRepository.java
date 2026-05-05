package com.rankhub.ranking_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.entity.Game;
import com.rankhub.ranking_service.entity.GameName;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class GameNameRepository {

    private final GameNameJpaRepository gameNameJpaRepository;

    public List<GameName> findAllByRankingId(UUID rankingId) {
        return gameNameJpaRepository.findAllByRankingId(rankingId);
    }

    public GameName save(GameName gameName) {
        return gameNameJpaRepository.save(gameName);
    }
}
