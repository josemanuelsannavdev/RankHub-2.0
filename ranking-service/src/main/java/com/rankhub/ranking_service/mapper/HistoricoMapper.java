package com.rankhub.ranking_service.mapper;

import org.springframework.stereotype.Component;

import com.rankhub.ranking_service.dto.GameNameDto;
import com.rankhub.ranking_service.dto.HistoricoDto;
import com.rankhub.ranking_service.entity.GameName;
import com.rankhub.ranking_service.entity.Historico;
import com.rankhub.ranking_service.request.GameNameRequest;

@Component
public class HistoricoMapper {
    // Entity → DTO
    public HistoricoDto toDto(Historico historico) {
        if (historico == null) {
            return null;
        }

        HistoricoDto response = new HistoricoDto();

       

        return response;
    }
}
