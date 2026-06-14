package com.rankhub.chat_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rankhub.chat_service.entity.Message;
import com.rankhub.chat_service.repository.MessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    
    private final MessageRepository messageRepository;

    @Override
    public List<Message> findAll() {
        return messageRepository.findAll();
    }

    @Override
    public Message save(Message message) {
        return messageRepository.save(message);
    }
    
    @Override
    public List<Message> findByChatId(java.util.UUID chatId) {
        return messageRepository.findByChatId(chatId);
    }   
}
