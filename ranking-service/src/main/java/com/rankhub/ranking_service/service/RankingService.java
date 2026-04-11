package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import com.rankhub.ranking_service.dto.RankingWithRoleDto;
import com.rankhub.ranking_service.entity.Ranking;
import com.rankhub.ranking_service.request.RankingRequest;

public interface RankingService {
    List<Ranking> getAllRankings();

    Ranking getRankingById(UUID id);

    Ranking createRanking(RankingRequest rankingRequest);

    Ranking updateRanking(UUID rankingId, RankingRequest rankingRequest);

    Ranking patchRanking(UUID rankingId, RankingRequest request);

    List<RankingWithRoleDto> getRankingsByUserId(UUID userId);

}
