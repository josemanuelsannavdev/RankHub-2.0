package com.rankhub.bets_service.dto;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class BetDto {
  
    private UUID id;

    private UUID eventId;

    private UUID sideId;

    private UUID playerId;

    private Integer points;

    private String status;

    private String playerName;

    private String playerImage;

    private String creatorName;

    private String action;
}
