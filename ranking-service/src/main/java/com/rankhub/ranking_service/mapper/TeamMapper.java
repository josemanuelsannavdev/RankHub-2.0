package com.rankhub.ranking_service.mapper;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.rankhub.ranking_service.dto.TeamDto;
import com.rankhub.ranking_service.dto.TeamMemberDto;
import com.rankhub.ranking_service.entity.Team;
import com.rankhub.ranking_service.request.TeamRequest;

@Component
public class TeamMapper {

    public Team toEntity(TeamRequest request, UUID gameId) {
        if (request == null) {
            return null;
        }

        Team team = new Team();
        team.setGameId(gameId);
        team.setName(request.getName() != null ? request.getName().trim() : null);
        team.setPosition(request.getPosition());
        team.setPoints(request.getPoints());
        return team;
    }

    public TeamDto toDto(Team entity, List<TeamMemberDto> members) {
        if (entity == null) {
            return null;
        }

        TeamDto teamDto = new TeamDto();
        teamDto.setId(entity.getId());
        teamDto.setName(entity.getName());
        teamDto.setPosition(entity.getPosition());
        teamDto.setPoints(entity.getPoints());
        teamDto.setMembers(members);
        return teamDto;
    }
}