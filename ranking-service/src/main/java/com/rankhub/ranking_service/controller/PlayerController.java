package com.rankhub.ranking_service.controller;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.rankhub.ranking_service.dto.PlayerDto;
import com.rankhub.ranking_service.entity.Player;
import com.rankhub.ranking_service.mapper.PlayerMapper;
import com.rankhub.ranking_service.service.PlayerServiceImp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PlayerController {

    private final PlayerServiceImp playerServiceImp;
    private final PlayerMapper mapper;

    /* Get all players of a ranking */

    @GetMapping("/ranking/{rankingId}/players")
    public ResponseEntity<List<PlayerDto>> getAllPlayerOfRanking(@PathVariable UUID rankingId) {
        List<Player> rankings = playerServiceImp.getAllPlayersOfRanking(rankingId);
        if (rankings != null) {
            List<PlayerDto> playersDto = rankings.stream()
                    .map(mapper::toDto)
                    .toList();
            return ResponseEntity.ok(playersDto);
        } else {
            return ResponseEntity.ok(Collections.emptyList());
        }
    }
}
