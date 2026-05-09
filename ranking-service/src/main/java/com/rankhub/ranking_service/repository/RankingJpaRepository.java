package com.rankhub.ranking_service.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rankhub.ranking_service.dto.RankingWithRoleDto;
import com.rankhub.ranking_service.entity.Ranking;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RankingJpaRepository extends JpaRepository<Ranking, UUID>, JpaSpecificationExecutor<Ranking> {

    @Query("SELECT new com.rankhub.ranking_service.dto.RankingWithRoleDto(r.name,r.id,ro.roleType,r.icon,r.description) FROM Ranking r JOIN Role ro ON r.id = ro.rankingId WHERE ro.userId = :userId")
    List<RankingWithRoleDto> getRankingsByUserId(@Param("userId") UUID userId);
}
