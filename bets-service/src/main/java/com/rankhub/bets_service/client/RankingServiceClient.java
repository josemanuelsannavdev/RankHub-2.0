package com.rankhub.bets_service.client;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.rankhub.bets_service.client.request.OddsRequest;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RankingServiceClient {
    private final RestTemplate restTemplate;

    public Map<String, Double> getOddsForEvent(List<UUID> blueSidePlayerIds, List<UUID> redSidePlayerIds,
            String gameName, UUID rankingId) {
        String url = "http://localhost:8082/ranking/odds";
        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    url,
                    new OddsRequest(blueSidePlayerIds, redSidePlayerIds, gameName, rankingId),
                    Map.class);

            return response.getBody();

        } catch (Exception e) {
            // En caso de error, lanzamos una excepción
            throw new RuntimeException("Error al obtener las cuotas", e);
        }
    }

    public void addBetPoints(Map<UUID, Double> betPoints) {
        String url = "http://localhost:8082/players";

        try {
            restTemplate.put(url, betPoints);
        } catch (Exception e) {
            throw new RuntimeException("Error al añadir los puntos de apuesta", e);
        }
    }

}
