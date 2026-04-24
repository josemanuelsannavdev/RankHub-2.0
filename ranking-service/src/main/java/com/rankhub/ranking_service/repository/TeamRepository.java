package com.rankhub.ranking_service.repository;

import java.util.List;

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
}
