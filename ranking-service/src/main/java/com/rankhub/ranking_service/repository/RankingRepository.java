package com.rankhub.ranking_service.repository;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.entity.Ranking;

@Repository
@RequiredArgsConstructor
public class RankingRepository {

    private final RankingJpaRepository rankingJpaRepository;
    
    public List<Ranking> getAllRankings(){return rankingJpaRepository.findAll();}
    
}
