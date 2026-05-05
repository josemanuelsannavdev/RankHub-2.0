package com.rankhub.ranking_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.util.UUID;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

public class HistoricoDto {
    private UUID gameId;
    private UUID playerId;
    private Double totalPoints;
    private Double obtainedPoints;
    
}