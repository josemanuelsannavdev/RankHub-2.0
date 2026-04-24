package com.rankhub.ranking_service.dto;

import java.util.List;
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
public class TeamGameDto {
    private UUID id;
    private String name;
    private UUID rankingId;
    private String date;
    private String type;
    private List<TeamDto> teams;
}
