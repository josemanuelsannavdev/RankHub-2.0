package com.rankhub.bets_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.rankhub.bets_service.entity.SidePlayer;

public interface SidePlayerJpaRepository extends JpaRepository<SidePlayer, UUID>, JpaSpecificationExecutor<SidePlayer> {
    
    List<SidePlayer> findBySideId(UUID sideId);
}
