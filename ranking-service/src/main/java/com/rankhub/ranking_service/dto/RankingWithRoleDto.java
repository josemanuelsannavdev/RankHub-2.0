package com.rankhub.ranking_service.dto;

import java.util.UUID;

import com.rankhub.ranking_service.entity.utils.RoleType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RankingWithRoleDto {
    private String name;
    private UUID id;
    private RoleType role;
    private String icon;
    private String description;
}