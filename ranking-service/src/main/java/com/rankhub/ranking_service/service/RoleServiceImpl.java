package com.rankhub.ranking_service.service;

import org.springframework.stereotype.Service;

import com.rankhub.ranking_service.dto.RoleDto;
import com.rankhub.ranking_service.entity.Role;
import com.rankhub.ranking_service.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    
    private final RoleRepository roleRepository;

    @Override
    public Role createRole(RoleDto role) {
            Role newRole = new Role();
            newRole.setUserId(role.getUserId());
            newRole.setRankingId(role.getRankingId());
            newRole.setRole(role.getRole());
            roleRepository.save(newRole)    ;
            return newRole;
    }
    
}
