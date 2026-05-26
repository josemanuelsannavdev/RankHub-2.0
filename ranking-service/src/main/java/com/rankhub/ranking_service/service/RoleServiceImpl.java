package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rankhub.ranking_service.dto.RoleDto;
import com.rankhub.ranking_service.entity.Role;
import com.rankhub.ranking_service.entity.utils.RoleType;
import com.rankhub.ranking_service.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

   

    

    @Override
    public Role getByRankingIdUserId(UUID rankingId, UUID userId) {
        return roleRepository.getByRankingIdUserId(rankingId, userId);
    }

    @Override
    public Role getRoleByRankingIdRoleType(UUID rankingId, RoleType roleType) {
        List<Role> roles = roleRepository.getRoleByRankingIdRoleType(rankingId, roleType);
        return roles.isEmpty() ? null : roles.get(0);
    }
}
