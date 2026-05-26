package com.rankhub.ranking_service.controller;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.rankhub.ranking_service.dto.ApiMessageDto;
import com.rankhub.ranking_service.dto.PlayerDto;
import com.rankhub.ranking_service.entity.Role;
import com.rankhub.ranking_service.entity.utils.RoleType;
import com.rankhub.ranking_service.request.PlayerRequest;
import com.rankhub.ranking_service.service.PlayerService;
import com.rankhub.ranking_service.service.RoleService;

import org.springframework.web.server.ResponseStatusException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequiredArgsConstructor
@Slf4j
public class PlayerController {

    private final PlayerService playerService;
    private final RoleService roleService;

    /* Get all players of a ranking */
    @GetMapping("/ranking/players/{rankingId}")
    public ResponseEntity<List<PlayerDto>> getAllPlayerOfRanking(@PathVariable UUID rankingId) {
        List<PlayerDto> rankings = playerService.getAllPlayersOfRanking(rankingId);
        if (rankings != null) {
            return ResponseEntity.ok(rankings);
        } else {
            return ResponseEntity.ok(Collections.emptyList());
        }
    }

    /* Get a player by id */
    @GetMapping("/player/{playerId}")
    public ResponseEntity<PlayerDto> getPlayerById(@PathVariable UUID playerId) {
        PlayerDto playerDto = playerService.getPlayerById(playerId);
        if (playerDto != null) {
            return ResponseEntity.ok(playerDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /* Create a new player */
    @PostMapping("/player")
    public ResponseEntity<PlayerDto> createPlayer(@RequestBody PlayerRequest playerRequest,
            @RequestHeader("X-User-Id") UUID userId) {

        Role userRole = roleService.getByRankingIdUserId(playerRequest.getRankingId(), userId);
        if (userRole == null) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "No tienes acceso a este ranking");
        }

        if (userRole.getRoleType() != RoleType.ADMIN && userRole.getRoleType() != RoleType.SUB_ADMIN) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "No tienes permisos para crear un jugador en este ranking");
        }

        PlayerDto createdPlayerDto = playerService.createPlayer(playerRequest);
        return ResponseEntity.ok(createdPlayerDto);
    }


    @PutMapping("player/{playerId}")
    public ResponseEntity<PlayerDto> putMethodName(@PathVariable UUID playerId, @RequestBody PlayerRequest newPlayerRequest, @RequestHeader("X-User-Id") UUID userId) {
        Role userRole = roleService.getByRankingIdUserId(newPlayerRequest.getRankingId(), userId);
        if (userRole == null) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "No tienes acceso a este ranking");
        }

        if (userRole.getRoleType() != RoleType.ADMIN && userRole.getRoleType() != RoleType.SUB_ADMIN) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "No tienes permisos para editar un jugador en este ranking");
        }

        PlayerDto updatedPlayerDto = playerService.updatePlayer(playerId, newPlayerRequest);
        return ResponseEntity.ok(updatedPlayerDto);
    }


}
