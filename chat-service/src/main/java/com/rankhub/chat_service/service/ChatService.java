package com.rankhub.chat_service.service;

import java.util.UUID;

import com.rankhub.chat_service.dto.ChatDto;
import com.rankhub.chat_service.entity.Chat;

public interface ChatService {
    
    Chat save(Chat chat);

    ChatDto findByRankingId(UUID rankingId);
}
