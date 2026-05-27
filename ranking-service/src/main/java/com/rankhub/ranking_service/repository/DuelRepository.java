package com.rankhub.ranking_service.repository;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.entity.Duel;
import com.rankhub.ranking_service.entity.Game;
import com.rankhub.ranking_service.entity.GameName;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class DuelRepository {
    
    private final DuelJpaRepository duelJpaRepository;

    public Duel save(Duel duel) {
        return duelJpaRepository.save(duel);
    }

    public List<Duel> findByGameIdIn(List<UUID> gameIds) {
        return duelJpaRepository.findByGameIdIn(gameIds);
    }

    public Duel findByGameId(UUID gameId) {
        return duelJpaRepository.findByGameId(gameId);
    }

    public List<Duel> findByWinnerId( UUID winnerId) {
        return duelJpaRepository.findByWinnerId(winnerId);
    }

    public List<Duel> findByLoserId(UUID loserId) {
        return duelJpaRepository.findByLoserId( loserId);
    }

}
