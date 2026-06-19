package com.rankhub.bets_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.rankhub.bets_service.entity.Bet;

public interface BetJpaRepository extends JpaRepository<Bet, UUID>, JpaSpecificationExecutor<Bet> {
    
    List<Bet> findByEventId(UUID eventId);
}
