package com.rankhub.ranking_service.client;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ChatServiceClient {
    private final RestTemplate restTemplate;

    public void createChat(UUID rankingId) {
        try {
            String url = "http://localhost:8084/chat?rankingId=" + rankingId;

            restTemplate.postForEntity(
                    url,
                    null,
                    Void.class);

        } catch (Exception e) {
            throw new RuntimeException("Error al crear el chat", e);
        }
    }

    

}
