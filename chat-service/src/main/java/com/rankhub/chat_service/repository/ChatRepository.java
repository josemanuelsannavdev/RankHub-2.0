package com.rankhub.chat_service.repository;

import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.chat_service.entity.Chat;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChatRepository {
    private final ChatJpaRepository chatJpaRepository;

    public Chat save(Chat chat) {
        return chatJpaRepository.save(chat);
    }

    public Chat findByRankingId(UUID rankingId) {
        return chatJpaRepository.findByRankingId(rankingId);
    }
}
