package com.rankhub.ranking_service.request;

import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlayerRequest {

    @Size(max = 80)
    private String name;

    @PositiveOrZero
    private Double points;

    private Integer gamesPlayed;

    private Integer gamesLost;

    private Integer gamesWon;
    
    private String image;
}
