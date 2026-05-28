package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import com.rankhub.ranking_service.dto.HistoricoDto;

public interface HistoricoService {
    
    List<HistoricoDto> getAllHistoricos(UUID rankingId);

    List<HistoricoDto>getHistoricosByGame(UUID gameId);
}
