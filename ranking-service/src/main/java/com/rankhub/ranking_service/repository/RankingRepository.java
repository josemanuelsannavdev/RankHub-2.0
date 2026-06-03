package com.rankhub.ranking_service.repository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.dto.RankingWithRoleDto;
import com.rankhub.ranking_service.entity.Ranking;

@Repository
@RequiredArgsConstructor
public class RankingRepository {

    private final RankingJpaRepository rankingJpaRepository;

    public List<Ranking> getAllRankings() {
        return rankingJpaRepository.findAll();
    }

    public Ranking getRankingById(UUID id) {
        return rankingJpaRepository.findById(id).orElse(null);
    }

    public Ranking save(Ranking ranking) {
        return rankingJpaRepository.save(ranking);
    }

    public void delete(UUID rankingId){
        rankingJpaRepository.deleteById(rankingId);
    }
    public List<RankingWithRoleDto> getRankingsByUserId(UUID userId) {
        return rankingJpaRepository.getRankingsByUserId(userId);
    }

    
}
