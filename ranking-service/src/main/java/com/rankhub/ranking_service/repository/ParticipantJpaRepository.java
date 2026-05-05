package com.rankhub.ranking_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.rankhub.ranking_service.entity.Participant;

public interface ParticipantJpaRepository extends JpaRepository<Participant, UUID>, JpaSpecificationExecutor<Participant> {
	List<Participant> findByGameIdIn(List<UUID> gameIds);
	List<Participant> findByGameId(UUID gameId);
}
