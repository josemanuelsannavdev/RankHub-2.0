package com.rankhub.ranking_service.dto;

import java.util.UUID;

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
public class ParticipantDto {
    private UUID id;
    private UUID playerId;
    private String guestName;
    private int position;
    private int points;
    private PlayerDto player;
}
