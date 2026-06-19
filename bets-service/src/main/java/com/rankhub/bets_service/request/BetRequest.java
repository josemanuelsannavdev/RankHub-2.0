package com.rankhub.bets_service.request;


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
public class BetRequest {

    private UUID playerId;

    private Integer points;

    private String side;

    private String playerName;

    private String playerImage;

    private String creatorName;

    private String action; 

    private UUID id;

}
