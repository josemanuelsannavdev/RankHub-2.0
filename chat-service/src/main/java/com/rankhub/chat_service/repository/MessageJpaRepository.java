package com.rankhub.chat_service.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.rankhub.chat_service.entity.Message;


public interface MessageJpaRepository extends JpaRepository<Message, UUID>, JpaSpecificationExecutor<Message> {
    
    java.util.List<Message> findByChatId(UUID chatId);
}
