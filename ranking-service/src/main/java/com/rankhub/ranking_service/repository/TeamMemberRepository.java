package com.rankhub.ranking_service.repository;

import java.util.List;

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
}
