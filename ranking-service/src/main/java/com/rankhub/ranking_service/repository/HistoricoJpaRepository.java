package com.rankhub.ranking_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.rankhub.ranking_service.entity.Historico;

public interface HistoricoJpaRepository extends JpaRepository<Historico, UUID>, JpaSpecificationExecutor<Historico>{
    
    public List<Historico> findByGameId(UUID gameId);
}
