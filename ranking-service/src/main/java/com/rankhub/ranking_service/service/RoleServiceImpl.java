package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.rankhub.ranking_service.dto.RoleDto;
import com.rankhub.ranking_service.entity.Role;
import com.rankhub.ranking_service.entity.utils.RoleType;
import com.rankhub.ranking_service.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public Role createRole(RoleDto role) {
        /*Role newRole = new Role();
        newRole.setUserId(role.getUserId());
        newRole.setRankingId(role.getRankingId());
        newRole.setRoleType(role.getRole());*/
        Role newRole = Role.builder()
                .userId(role.getUserId())
                .rankingId(role.getRankingId())
                .roleType(role.getRole())
                .build();
        roleRepository.save(newRole);
        return newRole;
    }

    @Override
    public boolean deleteByRankingIdUserId(UUID rankingId, UUID userId) {
        Role role = getByRankingIdUserId(rankingId, userId);
        if (role == null) {
            return false;
        }

        /* Si es admin, tiene que convertir a otra persona aleatoria en Admin */
        if (role.getRoleType() == RoleType.ADMIN) {
            /* Si hay algun subadmin, lo convierte en Admin */
            
            /* Si no lo hay, cualquiera aleatoria */
            /* Si no hay nadie más, borramos definitivamente el ranking */
            return false;
        } else {/* Si no es admin, simplemente borramos el rol */
            roleRepository.deleteByRankingIdUserId(rankingId, userId);
            return true;
        }

    }

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
