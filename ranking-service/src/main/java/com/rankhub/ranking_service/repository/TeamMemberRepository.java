package com.rankhub.ranking_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.entity.TeamMember;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TeamMemberRepository {

    private final TeamMemberJpaRepository teamMemberJpaRepository;

    public List<TeamMember> saveAll(List<TeamMember> members) {
        return teamMemberJpaRepository.saveAll(members);
    }

    public List<TeamMember> findByTeamIdIn(List<UUID> teamIds) {
        return teamMemberJpaRepository.findByTeamIdIn(teamIds);
    }

    public List<TeamMember> findByTeamId(UUID teamId) {
        return teamMemberJpaRepository.findByTeamId(teamId);
    }
}
