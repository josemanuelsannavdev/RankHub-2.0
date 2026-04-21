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
public class PlayerDto {
    private UUID id;
    private String name;
    private Double points;
    private Integer gamesPlayed;
    private Integer gamesLost;
    private Integer gamesWon;
    private String image;
}

