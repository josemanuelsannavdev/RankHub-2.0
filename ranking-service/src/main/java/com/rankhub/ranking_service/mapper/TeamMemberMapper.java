package com.rankhub.ranking_service.mapper;

import java.util.UUID;

import org.springframework.stereotype.Component;

import com.rankhub.ranking_service.dto.TeamMemberDto;
import com.rankhub.ranking_service.entity.TeamMember;
import com.rankhub.ranking_service.request.TeamMemberRequest;

@Component
public class TeamMemberMapper {

    public TeamMember toEntity(TeamMemberRequest request, UUID teamId) {
        if (request == null) {
            return null;
        }

        TeamMember teamMember = new TeamMember();
        teamMember.setTeamId(teamId);
        teamMember.setPlayerId(request.getPlayerId());
        teamMember.setGuestName(request.getGuestName() != null ? request.getGuestName().trim() : null);
        return teamMember;
    }

    public TeamMemberDto toDto(TeamMember entity) {
        if (entity == null) {
            return null;
        }

        TeamMemberDto teamMemberDto = new TeamMemberDto();
        teamMemberDto.setId(entity.getId());
        teamMemberDto.setPlayerId(entity.getPlayerId());
        teamMemberDto.setGuestName(entity.getGuestName());
        return teamMemberDto;
    }
}