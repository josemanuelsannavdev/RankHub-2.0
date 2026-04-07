package com.rankhub.ranking_service.controller;

import org.springframework.web.bind.annotation.RestController;

import com.rankhub.ranking_service.entity.Ranking;
import com.rankhub.ranking_service.service.RankingServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RankingController {

    private final RankingServiceImpl rankingService;

    @GetMapping("/ranking")
    public String getAllRankings() {
        List<Ranking> rankings = rankingService.getAllRankings();

        return rankings.toString();
    }

    @GetMapping("/my-teams")
    public String test(@RequestHeader("X-User-Id") String userId) {
        return "User is: " + userId;
    }

}
