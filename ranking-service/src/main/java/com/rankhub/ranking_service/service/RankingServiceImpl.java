package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rankhub.ranking_service.dto.RankingDto;
import com.rankhub.ranking_service.dto.RankingWithRoleDto;
import com.rankhub.ranking_service.entity.Ranking;
import com.rankhub.ranking_service.entity.Role;
import com.rankhub.ranking_service.entity.utils.RoleType;
import com.rankhub.ranking_service.mapper.RankingMapper;
import com.rankhub.ranking_service.repository.RankingRepository;
import com.rankhub.ranking_service.repository.RoleRepository;
import com.rankhub.ranking_service.request.RankingRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {

    private final RankingRepository rankingRepository;
    private final RoleRepository roleRepository;
    private final RankingMapper rankingMapper;

    @Override
    public RankingDto getRankingById(UUID id) {
        Ranking ranking = rankingRepository.getRankingById(id);
        if (ranking == null) {
            throw new IllegalArgumentException("Ranking no encontrado: " + id);
        }
        return rankingMapper.toDto(ranking);
    }

    private Ranking saveRanking(RankingRequest rankingRequest) {
        Ranking ranking = Ranking.builder()
                .name(rankingRequest.getName() != null ? rankingRequest.getName().trim() : null)
                .icon(rankingRequest.getIcon())
                .description(rankingRequest.getDescription())
                .build();
        return rankingRepository.save(ranking);
    }

    @Override
    @Transactional
    public RankingWithRoleDto createRankingForUser(RankingRequest rankingRequest, UUID userId) {
        if (userId == null) {
            throw new IllegalArgumentException("El ID de usuario no puede ser nulo");
        }

        Ranking createdRanking = saveRanking(rankingRequest);

        Role adminRole = Role.builder()
                .rankingId(createdRanking.getId())
                .userId(userId)
                .roleType(RoleType.ADMIN)
                .build();
        roleRepository.save(adminRole);

        return RankingWithRoleDto.builder()
                .id(createdRanking.getId())
                .name(createdRanking.getName())
                .icon(createdRanking.getIcon())
                .description(createdRanking.getDescription())
                .role(adminRole.getRoleType())
                .build();

    }

    @Override
    @Transactional
    public RankingDto updateRanking(UUID rankingId, RankingRequest rankingRequest) {

        Ranking existingRanking = rankingRepository.getRankingById(rankingId);
        if (existingRanking == null) {
            throw new IllegalArgumentException("Ranking no encontrado: " + rankingId);
        }
        // Validación de nombre
        if (rankingRequest.getName() == null || rankingRequest.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del ranking no puede estar vacío");
        }
        existingRanking.setName(rankingRequest.getName() != null ? rankingRequest.getName().trim() : null);
        existingRanking.setIcon(rankingRequest.getIcon());
        existingRanking.setDescription(rankingRequest.getDescription());

        Ranking saveRanking = rankingRepository.save(existingRanking);
        return rankingMapper.toDto(saveRanking);
    }

    @Override
    @Transactional
    public RankingDto patchRanking(UUID rankingId, RankingRequest request) {
        Ranking existingRanking = rankingRepository.getRankingById(rankingId);
        if (existingRanking == null) {
            throw new IllegalArgumentException("Ranking no encontrado: " + rankingId);
        }
        if (request.getName() != null) {
            String trimmedName = request.getName().trim();
            if (trimmedName.isEmpty()) {
                throw new IllegalArgumentException("El nombre del ranking no puede estar vacío");
            }
            existingRanking.setName(trimmedName);
        }

        if (request.getIcon() != null) {
            existingRanking.setIcon(request.getIcon());
        }
        if (request.getDescription() != null) {
            existingRanking.setDescription(request.getDescription());
        }
        Ranking saveRanking = rankingRepository.save(existingRanking);
        return rankingMapper.toDto(saveRanking);
    }

    @Override
    @Transactional
    public void deleteRanking(UUID rankingId) {
        Ranking ranking = rankingRepository.getRankingById(rankingId);
        if (ranking == null) {
            throw new IllegalArgumentException("Ranking no encontrado: " + rankingId);
        }
        rankingRepository.delete(rankingId);
    }

    @Override
    public List<RankingWithRoleDto> getRankingsByUserId(UUID userId) {
        if (userId == null) {
            throw new IllegalArgumentException("El ID de usuario no puede ser nulo");
        }
        return rankingRepository.getRankingsByUserId(userId);
    }

    @Override
    @Transactional
    public boolean leaveRanking(UUID rankingId, UUID userId) {
        if (rankingId == null || userId == null) {
            throw new IllegalArgumentException("El ID de ranking y el ID de usuario no pueden ser nulos");
        }
        Role userRole = roleRepository.getByRankingIdUserId(rankingId, userId);
        if (userRole == null) {
            throw new IllegalArgumentException("El usuario no tiene un rol en este ranking");
        }
        // Si no es admin, simplemente eliminar su rol
        if (userRole.getRoleType() != RoleType.ADMIN) {
            roleRepository.deleteByRankingIdUserId(rankingId, userId);
            return true;
        }
        if (userRole.getRoleType() != RoleType.ADMIN) {
            roleRepository.deleteByRankingIdUserId(rankingId, userId);
            return true; // Has salido del ranking
        }

        // Es admin - buscar sucesor antes de eliminar
        List<Role> subAdminRoles = roleRepository.getRoleByRankingIdRoleType(rankingId, RoleType.SUB_ADMIN);


        if (!subAdminRoles.isEmpty()) {
            // Promover el primer sub-admin a admin
            Role subAdminRole = subAdminRoles.get(0);
            subAdminRole.setRoleType(RoleType.ADMIN);
            roleRepository.save(subAdminRole);
            roleRepository.deleteByRankingIdUserId(rankingId, userId);
            return true;
        }

        // No hay sub-admins, buscar guests
        List<Role> guestRoles = roleRepository.getRoleByRankingIdRoleType(rankingId, RoleType.GUEST);
        
        if (!guestRoles.isEmpty()) {
            // Promover el primer guest a admin
            Role guestRole = guestRoles.get(0);
            guestRole.setRoleType(RoleType.ADMIN);
            roleRepository.save(guestRole);
            roleRepository.deleteByRankingIdUserId(rankingId, userId);
            return true;
        }

        // No hay otros usuarios, eliminar el ranking completo
        roleRepository.deleteByRankingIdUserId(rankingId, userId);
        rankingRepository.delete(rankingId);
        return true;
    }

}
