package com.rankhub.ranking_service.repository;

import java.util.List;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.rankhub.ranking_service.entity.GameName;


public interface GameNameJpaRepository extends JpaRepository<GameName, UUID>, JpaSpecificationExecutor<GameName> {

    @Query("SELECT g FROM GameName g where g.rankingId = :rankingId ORDER BY g.name ASC")
    List<GameName> findAllByRankingId(UUID rankingId);
}
