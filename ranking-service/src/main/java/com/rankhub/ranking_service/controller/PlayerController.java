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
import com.rankhub.ranking_service.request.PlayerRequest;
import com.rankhub.ranking_service.service.PlayerService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequiredArgsConstructor
@Slf4j
public class PlayerController {

    private final PlayerService playerService;
    private final PlayerMapper mapper;

    /* Get all players of a ranking */
    @GetMapping("/ranking/players/{rankingId}")
    public ResponseEntity<List<PlayerDto>> getAllPlayerOfRanking(@PathVariable UUID rankingId) {
        List<Player> rankings = playerService.getAllPlayersOfRanking(rankingId);
        if (rankings != null) {
            List<PlayerDto> playersDto = rankings.stream()
                    .map(mapper::toDto)
                    .toList();
            return ResponseEntity.ok(playersDto);
        } else {
            return ResponseEntity.ok(Collections.emptyList());
        }
    }

    /* Get a player by id */
    @GetMapping("/player/{playerId}")
    public ResponseEntity<PlayerDto> getPlayerById(@PathVariable UUID playerId) {
        Player player = playerService.getPlayerById(playerId);
        if (player != null) {
            PlayerDto playerDto = mapper.toDto(player);
            return ResponseEntity.ok(playerDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /*Create a new player */
    @PostMapping("/player")
    public ResponseEntity<PlayerDto> createPlayer(@RequestBody PlayerRequest playerRequest) {
        
        Player createdPlayer = playerService.createPlayer(playerRequest);
        PlayerDto createdPlayerDto = mapper.toDto(createdPlayer);
        return ResponseEntity.ok(createdPlayerDto);
    }
    
    
}
