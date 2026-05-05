package com.rankhub.ranking_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.entity.Role;
import com.rankhub.ranking_service.entity.utils.RoleType;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RoleRepository {
    private final RoleJpaRepository roleJpaRepository;

    public Role save(Role role) {
        role = roleJpaRepository.save(role);
        //roleJpaRepository.insertRole(role.getRankingId(), role.getUserId(), role.getRole().toString());
        return role;
    }

    public void deleteByRankingIdUserId(UUID rankingId,UUID userId){
        roleJpaRepository.deleteByRankingIdUserId(rankingId,userId);
    }

    public Role getByRankingIdUserId(UUID rankingId,UUID userId){
        return roleJpaRepository.getByRankingIdUserId(rankingId,userId);
    }

    public List<Role> getRoleByRankingIdRoleType(UUID rankingId, RoleType roleType) {
        return roleJpaRepository.getRoleByRankingIdAndRoleType(rankingId, roleType);
    }
}
