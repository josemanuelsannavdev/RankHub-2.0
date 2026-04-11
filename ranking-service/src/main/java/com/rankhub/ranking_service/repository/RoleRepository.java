package com.rankhub.ranking_service.repository;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.entity.Role;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RoleRepository {
    private final RoleJpaRepository roleJpaRepository;

    public Role save(Role role) {
        roleJpaRepository.insertRole(role.getId(), role.getRankingId(), role.getUserId(), role.getRole().toString());
        return role;
    }
}
