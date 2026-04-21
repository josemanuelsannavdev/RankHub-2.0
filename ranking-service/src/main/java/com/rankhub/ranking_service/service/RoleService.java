package com.rankhub.ranking_service.service;

import java.util.UUID;

import com.rankhub.ranking_service.dto.RoleDto;
import com.rankhub.ranking_service.entity.Role;

public interface RoleService {
    Role createRole(RoleDto role);
    boolean deleteByRankingIdUserId(UUID rankingId,UUID userId);
    Role getByRankingIdUserId(UUID rankingId,UUID userId);

}
