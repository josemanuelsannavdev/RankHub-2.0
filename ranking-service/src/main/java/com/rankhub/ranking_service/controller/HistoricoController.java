package com.rankhub.ranking_service.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rankhub.ranking_service.dto.DuelGameDto;
import com.rankhub.ranking_service.dto.HistoricoDto;
import com.rankhub.ranking_service.dto.IndividualGameDto;
import com.rankhub.ranking_service.dto.TeamGameDto;
import com.rankhub.ranking_service.request.DuelGameRequest;
import com.rankhub.ranking_service.request.IndividualGameRequest;
import com.rankhub.ranking_service.request.TeamGameRequest;
import com.rankhub.ranking_service.service.GameService;
import com.rankhub.ranking_service.service.HistoricoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
@Slf4j
public class HistoricoController {

   private final HistoricoService historicoService;
   

   // Obtener todos los juegos de un ranking específico
   @GetMapping("/historicos/{rankingId}")
   public List<HistoricoDto> getAllHistoricos(@PathVariable UUID rankingId) {
      return historicoService.getAllHistoricos(rankingId);
   }

}
