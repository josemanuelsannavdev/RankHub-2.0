package com.rankhub.chat_service.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.rankhub.chat_service.entity.Message;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MessageRepository {
    
    private final MessageJpaRepository messageJpaRepository;

    public List<Message> findAll() {
        return messageJpaRepository.findAll();
    }

    public Message save(Message message) {
        return messageJpaRepository.save(message);
    }

    public List<Message> findByChatId(java.util.UUID chatId) {
        return messageJpaRepository.findByChatId(chatId);
    }
}
