package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import org.apache.tomcat.util.http.parser.HttpHeaderParser.HeaderDataSource;

import com.rankhub.ranking_service.dto.RankingWithRoleDto;
import com.rankhub.ranking_service.entity.Ranking;
import com.rankhub.ranking_service.request.RankingRequest;

public interface RankingService {
    

    Ranking getRankingById(UUID id);


    RankingWithRoleDto createRankingForUser(RankingRequest rankingRequest, UUID userId);

    Ranking updateRanking(UUID rankingId, RankingRequest rankingRequest);

    Ranking patchRanking(UUID rankingId, RankingRequest request);

    void  deleteRanking(UUID rankingId);

    List<RankingWithRoleDto> getRankingsByUserId(UUID userId);

    boolean leaveRanking(UUID rankingId, UUID userId);



}
