package com.rankhub.ranking_service.controller;

import com.rankhub.ranking_service.service.RoleServiceImpl;
import org.springframework.web.bind.annotation.RestController;

import com.rankhub.ranking_service.dto.RankingWithRoleDto;
import com.rankhub.ranking_service.dto.RankingDto;
import com.rankhub.ranking_service.dto.RoleDto;

import com.rankhub.ranking_service.entity.Ranking;
import com.rankhub.ranking_service.entity.utils.RoleType;
import com.rankhub.ranking_service.service.RankingServiceImpl;
import com.rankhub.ranking_service.mapper.RankingMapper;
import com.rankhub.ranking_service.request.RankingRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
 
@RestController
@RequiredArgsConstructor
@Slf4j
public class RankingController {

    private final RoleServiceImpl roleServiceImpl;
    private final RankingServiceImpl rankingService;
    private final RankingMapper mapper;


    /* Get all rankings */
    @GetMapping("/ranking")
    public ResponseEntity<List<RankingDto>> getAllRankings() {
        List<Ranking> rankings = rankingService.getAllRankings();
        if (rankings != null) {
            List<RankingDto> rankingDtos = rankings.stream()
                    .map(mapper::toDto)
                    .toList();
            return ResponseEntity.ok(rankingDtos);
        } else {
            return ResponseEntity.ok(Collections.emptyList());
        }
    }

    /* Get a ranking by its ID */
    @GetMapping("/ranking/{rankingId}")
    public ResponseEntity<RankingDto> getRankingById(@PathVariable UUID rankingId) {
        Ranking ranking = rankingService.getRankingById(rankingId);
        if (ranking != null) {
            return ResponseEntity.ok(mapper.toDto(ranking));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /* Create a ranking */
    @PostMapping("/ranking")
    public ResponseEntity<RankingWithRoleDto> createRanking(
            @RequestBody RankingRequest rankingRequest,
            @RequestHeader("X-User-Id") String userIdHeader) {

        UUID userId = UUID.fromString(userIdHeader);
        
        Ranking createdRanking = rankingService.createRanking(rankingRequest);
        if (createdRanking != null) {
            RoleDto role = new RoleDto();
            role.setRole(RoleType.ADMIN);
            role.setUserId(userId);
            role.setRankingId(createdRanking.getId());
            roleServiceImpl.createRole(role);
            RankingWithRoleDto rankingWithRoleDto = new RankingWithRoleDto(
                    createdRanking.getName(),
                    createdRanking.getId(),
                    role.getRole(),
                    createdRanking.getIcon()
            );
            return ResponseEntity.ok(rankingWithRoleDto);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    /* Update a ranking */
    @PutMapping("/ranking/{rankingId}")
    public ResponseEntity<RankingDto> updateRanking(
            @PathVariable UUID rankingId,
            @RequestBody RankingRequest rankingRequest) {

        Ranking updatedRanking = rankingService.updateRanking(rankingId, rankingRequest);
        if (updatedRanking != null) {
            RankingDto rankingDto = mapper.toDto(updatedRanking);
            return ResponseEntity.ok(rankingDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /* Patch a ranking */
    @PatchMapping("/ranking/{rankingId}")
    public ResponseEntity<RankingDto> patchRanking(
            @PathVariable UUID rankingId,
            @RequestBody RankingRequest request) {

        Ranking updatedRanking = rankingService.patchRanking(rankingId, request);

        if (updatedRanking != null) {
            RankingDto rankingDto = mapper.toDto(updatedRanking);
            return ResponseEntity.ok(rankingDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/me/ranking")
    public ResponseEntity<List<RankingWithRoleDto>> getMyRankings(
            @RequestHeader("X-User-Id") String userIdHeader) {

        UUID userId = UUID.fromString(userIdHeader);

        List<RankingWithRoleDto> rankingsWithRole = rankingService.getRankingsByUserId(userId);

        return ResponseEntity.ok(
                rankingsWithRole != null ? rankingsWithRole : Collections.emptyList());
    }

}
