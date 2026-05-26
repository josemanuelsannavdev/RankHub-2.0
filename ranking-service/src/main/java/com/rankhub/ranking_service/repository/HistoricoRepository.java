package com.rankhub.ranking_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.entity.Historico;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class HistoricoRepository {
    private final HistoricoJpaRepository historicoJpaRepository;

    public Historico save(Historico historico) {
        return historicoJpaRepository.save(historico);
    }

    public List<Historico> findByGameId(UUID gameId) {
        return historicoJpaRepository.findByGameId(gameId);
    }

    public List<Historico> findByGameIdIn(List<UUID> gameIds) {
        return historicoJpaRepository.findByGameIdIn(gameIds);
    }
}
