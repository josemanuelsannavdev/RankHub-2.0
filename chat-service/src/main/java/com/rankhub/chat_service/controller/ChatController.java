package com.rankhub.chat_service.controller;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.rankhub.chat_service.dto.ChatDto;
import com.rankhub.chat_service.dto.MessageDto;
import com.rankhub.chat_service.entity.Chat;
import com.rankhub.chat_service.entity.Message;
import com.rankhub.chat_service.service.ChatService;
import com.rankhub.chat_service.service.MessageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;

    @MessageMapping("/chat/{chatId}")
    public void sendMessage(@DestinationVariable UUID chatId, MessageDto chatMessageDto) {

        MessageDto newChatMessageDto = new MessageDto(chatMessageDto.getUsername(), chatMessageDto.getBody());
        messagingTemplate.convertAndSend(
                "/topic/chat/" + chatId,
                newChatMessageDto);

        Message newMessage = Message.builder()
                .chatId(chatId)
                .username(chatMessageDto.getUsername())
                .body(chatMessageDto.getBody())
                .date( new Timestamp(new Date(System.currentTimeMillis()).getTime()) )
                .build();
        messageService.save(newMessage);
    }

    @PostMapping("/chat")
    public ResponseEntity<Chat> createChat(@RequestParam UUID rankingId) {
        Chat chat = Chat.builder().rankingId(rankingId).build();
        Chat savedChat = chatService.save(chat);
        return ResponseEntity.ok(savedChat);
    }

    @GetMapping("chat/{chatId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable UUID chatId) {
        List<Message> messages = messageService.findByChatId(chatId);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("chat/ranking/{rankingId}")
    public ResponseEntity<ChatDto> getChatByRankingId(@PathVariable UUID rankingId) {
        ChatDto chat = chatService.findByRankingId(rankingId);
        
        return ResponseEntity.ok(chat);
    }
}
