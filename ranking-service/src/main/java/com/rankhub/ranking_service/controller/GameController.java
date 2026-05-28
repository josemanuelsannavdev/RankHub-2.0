package com.rankhub.ranking_service.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.rankhub.ranking_service.dto.DuelGameDto;
import com.rankhub.ranking_service.dto.IndividualGameDto;
import com.rankhub.ranking_service.dto.TeamGameDto;
import com.rankhub.ranking_service.entity.Role;
import com.rankhub.ranking_service.entity.utils.RoleType;
import com.rankhub.ranking_service.request.DuelGameRequest;
import com.rankhub.ranking_service.request.IndividualGameRequest;
import com.rankhub.ranking_service.request.TeamGameRequest;
import com.rankhub.ranking_service.service.GameService;
import com.rankhub.ranking_service.service.RoleService;

import jakarta.validation.Valid;
import org.springframework.web.server.ResponseStatusException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GameController {

   private final GameService gameService;
   private final RoleService roleService;

   @PostMapping("/game/individual")
   public ResponseEntity<IndividualGameDto> createIndividualGame(@Valid @RequestBody IndividualGameRequest request,
         @RequestHeader("X-User-Id") UUID userId) {
      // Verificar autorización
      Role role = roleService.getByRankingIdUserId(request.getRankingId(), userId);
      if (role == null) {
         throw new ResponseStatusException(
               HttpStatus.FORBIDDEN, "No tienes acceso a este ranking");
      }

      if (role.getRoleType() != RoleType.ADMIN && role.getRoleType() != RoleType.SUB_ADMIN) {
         throw new ResponseStatusException(
               HttpStatus.FORBIDDEN, "No tienes permisos para crear este juego en este ranking");
      }
      IndividualGameDto createdGame = gameService.createIndividualGame(request);
      return ResponseEntity.status(HttpStatus.CREATED).body(createdGame);
   }

   @PostMapping("/game/team")
   public ResponseEntity<TeamGameDto> createTeamGame(@Valid @RequestBody TeamGameRequest request,
         @RequestHeader("X-User-Id") UUID userId) {// Verificar autorización
      Role role = roleService.getByRankingIdUserId(request.getRankingId(), userId);
      if (role == null) {
         throw new ResponseStatusException(
               HttpStatus.FORBIDDEN, "No tienes acceso a este ranking");
      }

      if (role.getRoleType() != RoleType.ADMIN && role.getRoleType() != RoleType.SUB_ADMIN) {
         throw new ResponseStatusException(
               HttpStatus.FORBIDDEN, "No tienes permisos para crear este juego en este ranking");
      }
      TeamGameDto createdGame = gameService.createTeamGame(request);
      return ResponseEntity.status(HttpStatus.CREATED).body(createdGame);
   }

   @PostMapping("/game/duel")
   public ResponseEntity<DuelGameDto> createDuelGame(@Valid @RequestBody DuelGameRequest request,
         @RequestHeader("X-User-Id") UUID userId) {// Verificar autorización
      Role role = roleService.getByRankingIdUserId(request.getRankingId(), userId);
      if (role == null) {
         throw new ResponseStatusException(
               HttpStatus.FORBIDDEN, "No tienes acceso a este ranking");
      }

      if (role.getRoleType() != RoleType.ADMIN && role.getRoleType() != RoleType.SUB_ADMIN) {
         throw new ResponseStatusException(
               HttpStatus.FORBIDDEN, "No tienes permisos para crear este duelo en este ranking");
      }
      DuelGameDto createdGame = gameService.createDuelGame(request);
      return ResponseEntity.status(HttpStatus.CREATED).body(createdGame);
   }

   // Obtener todos los juegos de un ranking específico
   @GetMapping("/games/{rankingId}")
   public List<Object> getAllGamesDetailed(@PathVariable UUID rankingId) {
      return gameService.getAllGamesDetailed(rankingId);
   }

   @GetMapping("/game/{gameId}")
   public Object getGameDetailed(@PathVariable UUID gameId) {
      return gameService.getGameDetailed(gameId);
   }
}
