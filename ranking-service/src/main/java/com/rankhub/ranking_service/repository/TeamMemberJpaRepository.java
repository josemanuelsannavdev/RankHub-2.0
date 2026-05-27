package com.rankhub.ranking_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.rankhub.ranking_service.entity.TeamMember;

public interface TeamMemberJpaRepository extends JpaRepository<TeamMember, UUID>, JpaSpecificationExecutor<TeamMember> {
	List<TeamMember> findByTeamIdIn(List<UUID> teamIds);
	List<TeamMember> findByTeamId(UUID teamId);
	void deleteByPlayerId(UUID playerId);
	List<TeamMember> findAllByPlayerId(UUID playerId);
}
