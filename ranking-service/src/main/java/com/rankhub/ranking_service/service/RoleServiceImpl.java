package com.rankhub.ranking_service.service;

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
        Role newRole = new Role();
        newRole.setUserId(role.getUserId());
        newRole.setRankingId(role.getRankingId());
        newRole.setRole(role.getRole());
        roleRepository.save(newRole);
        return newRole;
    }

    @Override
    public void delteByRankingIdUserId(UUID rankingId, UUID userId) {
        Role role = getByRankingIdUserId(rankingId, userId);

        /* Si es admin, tiene que convertir a otra persona aleatoria en Admin */
        if (role.getRole() == RoleType.ADMIN) {
            /* Si hay algun subadmin, lo convierte en Admin */
            
            /* Si no lo hay, cualquiera aleatoria */
            /* Si no hay nadie más, borramos definitivamente el ranking */
        } else {/* Si no es admin, simplemente borramos el rol */
            roleRepository.delteByRankingIdUserId(rankingId, userId);
        }

    }

    @Override
    public Role getByRankingIdUserId(UUID rankingId, UUID userId) {
        return roleRepository.getByRankingIdUserId(rankingId, userId);
    }
}
