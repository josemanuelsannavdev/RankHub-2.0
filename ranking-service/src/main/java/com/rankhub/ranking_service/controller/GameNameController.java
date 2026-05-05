package com.rankhub.ranking_service.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rankhub.ranking_service.dto.GameNameDto;
import com.rankhub.ranking_service.dto.IndividualGameDto;
import com.rankhub.ranking_service.dto.TeamGameDto;
import com.rankhub.ranking_service.request.GameNameRequest;
import com.rankhub.ranking_service.request.IndividualGameRequest;
import com.rankhub.ranking_service.request.TeamGameRequest;
import com.rankhub.ranking_service.service.GameNameService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.Collections;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GameNameController {
    
    private final GameNameService gameNameService;
    
    @GetMapping("/gameName/{rankingId}")
    public ResponseEntity<List<GameNameDto>> getAllGameNames(@PathVariable UUID rankingId) {
        List<GameNameDto> gameNames = gameNameService.findAllByRankingId(rankingId);
        return ResponseEntity.ok(gameNames != null ? gameNames : Collections.emptyList());
    }


    @PostMapping("/gameName")
    public ResponseEntity<GameNameDto> createGameName(@Valid @RequestBody GameNameRequest request) {
        GameNameDto createdGameName = gameNameService.createGameName(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGameName);
    }
    
    
}
