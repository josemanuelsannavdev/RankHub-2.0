package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import com.rankhub.ranking_service.dto.RankingDto;
import com.rankhub.ranking_service.dto.RankingWithRoleDto;
import com.rankhub.ranking_service.dto.UserDto;
import com.rankhub.ranking_service.entity.Ranking;
import com.rankhub.ranking_service.request.RankingRequest;

public interface RankingService {
    

    RankingDto getRankingById(UUID id);


    RankingWithRoleDto createRankingForUser(RankingRequest rankingRequest, UUID userId);

    RankingDto updateRanking(UUID rankingId, RankingRequest rankingRequest);

    RankingDto patchRanking(UUID rankingId, RankingRequest request);

    void  deleteRanking(UUID rankingId);

    List<RankingWithRoleDto> getRankingsByUserId(UUID userId);

    boolean leaveRanking(UUID rankingId, UUID userId);

    List<UserDto> getRankingMembers(UUID rankingId);

    void joinRanking(UUID rankingId, String email);

    void removeMemberFromRanking(UUID rankingId, String email);

    void changeRole(UUID rankingId, String email);
}
