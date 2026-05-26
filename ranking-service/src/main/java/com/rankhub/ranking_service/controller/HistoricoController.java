package com.rankhub.ranking_service.controller;

import java.util.List;
import java.util.UUID;


import org.springframework.web.bind.annotation.RestController;

import com.rankhub.ranking_service.dto.HistoricoDto;

import com.rankhub.ranking_service.service.HistoricoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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
