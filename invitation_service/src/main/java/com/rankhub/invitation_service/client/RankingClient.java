package com.rankhub.invitation_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import com.rankhub.invitation_service.dto.request.AddRankingMemberRequest;
import com.rankhub.invitation_service.dto.response.UserResponse;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;

import lombok.RequiredArgsConstructor;

//@FeignClient(name = "ranking-service", url = "${services.ranking.url}")
@Component
@RequiredArgsConstructor
public class RankingClient {
    //@Value("${services.ranking.base-url:http://localhost:8762/ranking-service}")
    @Value("${services.ranking.base-url:http://localhost:8082}")
    private String rankingServiceBaseUrl;

    private final RestTemplate restTemplate;

    public void addMember(@RequestBody AddRankingMemberRequest request) {

        String url = rankingServiceBaseUrl + "/ranking/join";
        restTemplate.postForEntity(url, request, Void.class);

    }

    public List<UserResponse> getRankingMembers(UUID rankingId) {
        String url = rankingServiceBaseUrl + "/ranking/" + rankingId + "/members";
        ResponseEntity<List<UserResponse>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<UserResponse>>() {}
        );
        return response.getBody();
    }
}
