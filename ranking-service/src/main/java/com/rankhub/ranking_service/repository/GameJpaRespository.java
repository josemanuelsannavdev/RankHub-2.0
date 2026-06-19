package com.rankhub.ranking_service.repository;


import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.rankhub.ranking_service.entity.Game;

public interface GameJpaRespository  extends JpaRepository<Game, UUID>, JpaSpecificationExecutor<Game> {

    
    
    @Query("SELECT p FROM Game p WHERE p.rankingId = :rankingId")
    List<Game> findAllGamesByRankingId(UUID rankingId);

    List<Game> findAllGamesByName(String gameName);
} 
