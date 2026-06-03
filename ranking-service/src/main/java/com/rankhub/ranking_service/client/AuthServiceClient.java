package com.rankhub.ranking_service.client;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthServiceClient {

    private final RestTemplate restTemplate;

    private String authServiceBaseUrl;

    public Map<UUID, String> getEmailsByIds(List<UUID> userIds) {
        if (userIds == null || userIds.isEmpty()) {
            return Map.of();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, List<UUID>>> request = new HttpEntity<>(Map.of("ids", userIds), headers);

        
          ResponseEntity<Map<UUID, String>> response = restTemplate.exchange(
          "http://localhost:8081" + "/auth/emails",
         org.springframework.http.HttpMethod.POST,
         request,
         new ParameterizedTypeReference<Map<UUID, String>>() {
          });
         

        /*ResponseEntity<String> response = restTemplate.exchange(
                authServiceBaseUrl + "/auth/emails",
                org.springframework.http.HttpMethod.POST,
                request,
                String.class);
        System.out.println("STATUS***************: " + response.getStatusCode());
        System.out.println("BODY****************: " + response.getBody());
        */
        return response.getBody() != null ? response.getBody() : Map.of();
        //return Map.of();
    }


    public UUID getUserIdByEmail(String email) {
        try {
            ResponseEntity<UUID> response = restTemplate.getForEntity(
                    "http://localhost:8081" + "/auth/user-id?email={email}",
                    UUID.class,
                    email
            );
            return response.getBody();
        } catch (Exception e) {
            // En caso de error, lanzamos una excepción
            throw new RuntimeException("Error al obtener el ID del usuario", e);
        }
    }

}