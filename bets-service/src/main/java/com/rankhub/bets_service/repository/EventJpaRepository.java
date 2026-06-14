package com.rankhub.bets_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.rankhub.bets_service.entity.Event;

public interface  EventJpaRepository extends JpaRepository<Event, UUID> , JpaSpecificationExecutor<Event> {
    
    public List<Event> findByRankingId(UUID rankingId);
}
