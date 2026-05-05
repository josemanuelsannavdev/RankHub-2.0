package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import org.apache.hc.client5.http.entity.mime.Header;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.session.HeaderWebSessionIdResolver;

import com.rankhub.ranking_service.dto.RankingWithRoleDto;
import com.rankhub.ranking_service.entity.Ranking;
import com.rankhub.ranking_service.entity.Role;
import com.rankhub.ranking_service.entity.utils.RoleType;
import com.rankhub.ranking_service.repository.RankingRepository;
import com.rankhub.ranking_service.repository.RoleRepository;
import com.rankhub.ranking_service.request.RankingRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {

    private final RankingRepository rankingRepository;
    private final RoleRepository roleRepository;

    @Override
    public Ranking getRankingById(UUID id) {
        Ranking ranking = rankingRepository.getRankingById(id);
        if (ranking == null) {
            throw new IllegalArgumentException("Ranking no encontrado: " + id);
        }
        return ranking;
    }

    private Ranking saveRanking(RankingRequest rankingRequest) {
        Ranking ranking = Ranking.builder()
                .name(rankingRequest.getName() != null ? rankingRequest.getName().trim() : null)
                .icon(rankingRequest.getIcon())
                .build();
        return rankingRepository.save(ranking);
    }

    @Override
    @Transactional
    public RankingWithRoleDto createRankingForUser(RankingRequest rankingRequest, UUID userId) {
        Ranking createdRanking = saveRanking(rankingRequest);

        Role adminRole = Role.builder()
                .rankingId(createdRanking.getId())
                .userId(userId)
                .roleType(RoleType.ADMIN)
                .build();
        roleRepository.save(adminRole);

        return new RankingWithRoleDto(
                createdRanking.getName(),
                createdRanking.getId(),
                adminRole.getRoleType(),
                createdRanking.getIcon());
    }

    @Override
    @Transactional
    public Ranking updateRanking(UUID rankingId, RankingRequest rankingRequest) {


       // Role role = roleRepository.getByRankingIdUserId(rankingId, userID);

        Ranking existingRanking = getRankingById(rankingId);

        existingRanking.setName(rankingRequest.getName() != null ? rankingRequest.getName().trim() : null);
        existingRanking.setIcon(rankingRequest.getIcon());
        return rankingRepository.save(existingRanking);
    }

    @Override
    @Transactional
    public Ranking patchRanking(UUID rankingId, RankingRequest request) {
        Ranking existingRanking = getRankingById(rankingId);

        if (request.getName() != null) {
            existingRanking.setName(request.getName().trim());
        }
        if (request.getIcon() != null) {
            existingRanking.setIcon(request.getIcon());
        }
        return rankingRepository.save(existingRanking);
    }

    @Override
    @Transactional
    public void deleteRanking(UUID rankingId) {
        rankingRepository.delete(rankingId);
    }

    @Override
    public List<RankingWithRoleDto> getRankingsByUserId(UUID userId) {
        return rankingRepository.getRankingsByUserId(userId);
    }

    @Override
    public boolean leaveRanking(UUID rankingId, UUID userId) {

        Role userRole = roleRepository.getByRankingIdUserId(rankingId, userId);
        if (userRole == null) {
            throw new IllegalArgumentException("El usuario no tiene un rol en este ranking");
        }

        if (userRole.getRoleType() != RoleType.ADMIN) {
            roleRepository.deleteByRankingIdUserId(rankingId, userId);
            return true; // Has salido del ranking
        }
        List<Role> subAdminRoles = roleRepository.getRoleByRankingIdRoleType(rankingId, RoleType.SUB_ADMIN);

        if (subAdminRoles.isEmpty()) {

            List<Role> guestRoles = roleRepository.getRoleByRankingIdRoleType(rankingId, RoleType.GUEST);
            if (guestRoles.isEmpty()) {
                rankingRepository.delete(rankingId);

            } else {
                // Convertir un GUEST en admin
                Role guestRole = guestRoles.get(0);
                guestRole.setRoleType(RoleType.ADMIN);
                roleRepository.save(guestRole);
            }
        } else {

            // Convertir un SUB_ADMIN en admin
            Role subAdminRole = subAdminRoles.get(0);
            subAdminRole.setRoleType(RoleType.ADMIN);
            roleRepository.save(subAdminRole);
        }
        roleRepository.deleteByRankingIdUserId(rankingId, userId);
        return true; // Has salido del ranking
    }

}
