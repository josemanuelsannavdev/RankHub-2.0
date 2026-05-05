package com.rankhub.ranking_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.entity.Team;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TeamRepository {

    private final TeamJpaRepository teamJpaRepository;

    public List<Team> saveAll(List<Team> teams) {
        return teamJpaRepository.saveAll(teams);
    }

    public List<Team> findByGameIdIn(List<UUID> gameIds) {
        return teamJpaRepository.findByGameIdIn(gameIds);
    }

    public List<Team> findByGameId(UUID gameId) {
        return teamJpaRepository.findByGameId(gameId);
    }
}
