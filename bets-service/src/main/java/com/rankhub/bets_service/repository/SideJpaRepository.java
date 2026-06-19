package com.rankhub.bets_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.rankhub.bets_service.entity.Side;

public interface SideJpaRepository  extends JpaRepository<Side, UUID> , JpaSpecificationExecutor<Side> {
    
    List<Side> findByEventId(UUID eventId);
}
