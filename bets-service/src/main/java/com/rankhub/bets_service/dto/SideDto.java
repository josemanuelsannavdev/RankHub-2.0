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
public class SideDto {

    private UUID id;
    
    private Double odds;

    private Boolean win;

    private List<PlayerDto> players;
}
