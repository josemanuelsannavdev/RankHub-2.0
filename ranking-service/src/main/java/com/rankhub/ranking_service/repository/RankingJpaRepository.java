package com.rankhub.ranking_service.repository;


import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.rankhub.ranking_service.entity.Ranking;

import org.springframework.data.jpa.repository.JpaRepository;
public interface  RankingJpaRepository  extends JpaRepository<Ranking,Long> , JpaSpecificationExecutor<Ranking>{
    
}
