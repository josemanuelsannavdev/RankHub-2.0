package com.rankhub.ranking_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.sql.Timestamp;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class HistoricoPlayerDto {
    
    private UUID playerId;
    private String playerName;
    private Double totalPoints;
    private Double obtainedPoints;
    private Integer position;
}