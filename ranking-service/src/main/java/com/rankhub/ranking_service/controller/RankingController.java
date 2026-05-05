package com.rankhub.ranking_service.controller;

import org.springframework.web.bind.annotation.RestController;
import com.rankhub.ranking_service.dto.ApiMessageDto;
import com.rankhub.ranking_service.dto.RankingWithRoleDto;
import com.rankhub.ranking_service.dto.RankingDto;

import com.rankhub.ranking_service.entity.Ranking;
import com.rankhub.ranking_service.entity.Role;

import com.rankhub.ranking_service.entity.utils.RoleType;
import com.rankhub.ranking_service.service.RankingService;
import com.rankhub.ranking_service.service.RoleService;
import com.rankhub.ranking_service.mapper.RankingMapper;
import com.rankhub.ranking_service.request.RankingRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    private final RoleService roleService;
    private final RankingService rankingService;
    private final RankingMapper mapper;

    

    /* Get a ranking by its ID */
    @GetMapping("/ranking/{rankingId}")
    public ResponseEntity<RankingDto> getRankingById(@PathVariable UUID rankingId) {
        Ranking ranking = rankingService.getRankingById(rankingId);
        return ResponseEntity.ok(mapper.toDto(ranking));
    }

    /* Create a ranking */
    @PostMapping("/ranking")
    public ResponseEntity<RankingWithRoleDto> createRanking(
            @Valid @RequestBody RankingRequest rankingRequest,
            @RequestHeader("X-User-Id") UUID userId) {

        RankingWithRoleDto rankingWithRoleDto = rankingService.createRankingForUser(rankingRequest, userId);

        return ResponseEntity.ok(rankingWithRoleDto);
    }

    /* Update a ranking */
    @PutMapping("/ranking/{rankingId}")
    public ResponseEntity<RankingDto> updateRanking(
            @PathVariable UUID rankingId,
            @Valid @RequestBody RankingRequest rankingRequest) {

        Ranking updatedRanking = rankingService.updateRanking(rankingId, rankingRequest);
        RankingDto rankingDto = mapper.toDto(updatedRanking);
        return ResponseEntity.ok(rankingDto);
    }

    /* Patch a ranking */
    @PatchMapping("/ranking/{rankingId}")
    public ResponseEntity<RankingDto> patchRanking(
            @PathVariable UUID rankingId,
            @Valid @RequestBody RankingRequest request) {

        Ranking updatedRanking = rankingService.patchRanking(rankingId, request);
        RankingDto rankingDto = mapper.toDto(updatedRanking);
        return ResponseEntity.ok(rankingDto);
    }

    /*Delete a ranking for everyone  */
    @DeleteMapping("/ranking/{rankingId}")
    public ResponseEntity<ApiMessageDto> deleteRanking(
            @PathVariable UUID rankingId,
            @RequestHeader("X-User-Id") UUID userId) {
        Role role = roleService.getByRankingIdUserId(rankingId, userId);
        if (role == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiMessageDto("No autorizado"));
        }
        if (role.getRoleType() == RoleType.ADMIN || role.getRoleType() == RoleType.SUB_ADMIN ) {
            rankingService.deleteRanking(rankingId);
            return ResponseEntity.ok(new ApiMessageDto("ranking eliminado"));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiMessageDto("No autorizado"));
        }
    }

    @GetMapping("/me/ranking")
    public ResponseEntity<List<RankingWithRoleDto>> getMyRankings(
            @RequestHeader("X-User-Id") UUID userId) {

        List<RankingWithRoleDto> rankingsWithRole = rankingService.getRankingsByUserId(userId);

        return ResponseEntity.ok(
                rankingsWithRole != null ? rankingsWithRole : Collections.emptyList());
    }

    /*Delete a ranking only for "Me" = Exit from the ranking */
    @DeleteMapping("/me/ranking/{rankingId}")
    public ResponseEntity<ApiMessageDto> leaveRanking(
            @RequestHeader("X-User-Id") UUID userId,
            @PathVariable UUID rankingId) {

        boolean left = rankingService.leaveRanking(rankingId, userId);
        if (!left) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiMessageDto("No autorizado para salir del ranking"));
        }

        return ResponseEntity.ok(new ApiMessageDto("Has salido del ranking"));
    }

}
