
package com.rankhub.ranking_service.repository;
import java.util.List;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.rankhub.ranking_service.entity.Duel;


public interface DuelJpaRepository extends JpaRepository<Duel, UUID>, JpaSpecificationExecutor<Duel> {

	List<Duel> findByGameIdIn(List<UUID> gameIds);
	Duel findByGameId(UUID gameId);

	List<Duel> findByWinnerId(UUID winnerId);

	List<Duel> findByLoserId(UUID loserId);
}
