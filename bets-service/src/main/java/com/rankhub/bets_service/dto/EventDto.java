package com.rankhub.bets_service.dto;

import java.sql.Timestamp;
import java.util.List;
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
public class EventDto {

    private UUID id;

    private UUID rankingId;

    private String gameName;

    private String status;
    private String creatorName;

    private Timestamp date;

    private SideDto blueSide;
    private SideDto redSide;

    private List<BetDto> bets;
}
