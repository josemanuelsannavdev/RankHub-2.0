package com.rankhub.ranking_service.service;

import com.rankhub.ranking_service.dto.RoleDto;
import com.rankhub.ranking_service.entity.Role;

public interface RoleService {
    Role createRole(RoleDto role);

}
