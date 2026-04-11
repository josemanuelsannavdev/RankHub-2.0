package com.rankhub.ranking_service.dto;

import java.util.UUID;

import com.rankhub.ranking_service.entity.utils.RoleType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RoleDto {

    private UUID userId;

    private UUID rankingId;

    private RoleType role;
}