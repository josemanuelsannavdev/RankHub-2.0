package com.rankhub.chat_service.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.rankhub.chat_service.dto.ChatDto;
import com.rankhub.chat_service.entity.Chat;
import com.rankhub.chat_service.entity.Message;
import com.rankhub.chat_service.repository.ChatRepository;
import com.rankhub.chat_service.service.MessageService;
import com.rankhub.chat_service.dto.MessageDto;
import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    
    private final ChatRepository chatRepository;
    private final MessageService messageService;
    

    @Override
    public Chat save(Chat chat) {
        return chatRepository.save(chat);
    }
    
    @Override
    public ChatDto findByRankingId(UUID rankingId) {
        Chat chat = chatRepository.findByRankingId(rankingId);
        if (chat == null) {
            return null; // O puedes lanzar una excepción personalizada
        }
        List<Message> messageDtos = messageService.findByChatId(chat.getId());
        List<MessageDto> messageDtosList = messageDtos.stream()
                .map(message -> MessageDto.builder()
                        .username(message.getUsername())
                        .body(message.getBody())
                        .build())
                .toList();
        
        return ChatDto.builder()
                .id(chat.getId())
                .rankingId(chat.getRankingId())
                .messages(messageDtosList)
                .build();
    }
}
