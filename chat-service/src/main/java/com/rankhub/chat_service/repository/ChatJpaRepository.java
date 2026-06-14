package com.rankhub.chat_service.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.rankhub.chat_service.entity.Chat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

public interface ChatJpaRepository extends JpaRepository<Chat, UUID>,JpaSpecificationExecutor<Chat> {
    
    Chat findByRankingId(UUID rankingId);
}
