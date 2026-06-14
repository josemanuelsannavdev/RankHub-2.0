package com.rankhub.chat_service.service;

import java.util.List;
import java.util.UUID;

import com.rankhub.chat_service.entity.Message;

public interface MessageService {
    List<Message> findAll();
    Message save(Message message);
    List<Message> findByChatId(UUID chatId);
}
