package com.rankhub.ranking_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.rankhub.ranking_service.entity.Team;

public interface TeamJpaRepository extends JpaRepository<Team, UUID>, JpaSpecificationExecutor<Team> {
	List<Team> findByGameIdIn(List<UUID> gameIds);
	List<Team> findByGameId(UUID gameId);

	
}
