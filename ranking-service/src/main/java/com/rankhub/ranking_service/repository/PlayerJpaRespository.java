package com.rankhub.ranking_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.rankhub.ranking_service.entity.Player;

public interface PlayerJpaRespository  extends JpaRepository<Player, UUID>, JpaSpecificationExecutor<Player> {

    
    
    @Query("SELECT p FROM Player p WHERE p.rankingId = :rankingId")
    List<Player> getAllPlayersOfRanking(UUID rankingId);

    boolean existsByNameIgnoreCase(String name);
} 
