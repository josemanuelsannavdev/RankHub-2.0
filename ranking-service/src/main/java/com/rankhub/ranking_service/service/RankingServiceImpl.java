package com.rankhub.ranking_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rankhub.ranking_service.entity.Ranking;
import com.rankhub.ranking_service.repository.RankingRepository;

@Service
public class RankingServiceImpl implements RankingService {
    @Autowired
    private RankingRepository rankingRepository;

    @Override
    public List<Ranking> getAllRankings() {
        return rankingRepository.getAllRankings();
    }
}
