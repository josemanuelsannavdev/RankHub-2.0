package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                .role(RoleType.ADMIN)
                .build();
        roleRepository.save(adminRole);

        return new RankingWithRoleDto(
                createdRanking.getName(),
                createdRanking.getId(),
                adminRole.getRole(),
                createdRanking.getIcon());
    }

    @Override
    @Transactional
    public Ranking updateRanking(UUID rankingId, RankingRequest rankingRequest) {
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
        getRankingById(rankingId);
        rankingRepository.delete(rankingId);
    }

    @Override
    public List<RankingWithRoleDto> getRankingsByUserId(UUID userId) {
        return rankingRepository.getRankingsByUserId(userId);
    }

}
