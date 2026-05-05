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

public class DuelGameDto {
    private UUID id;
    private String name;
    private UUID rankingId;
    private String date;
    private String type;
    private PlayerDto winner;
    private PlayerDto loser;
    private Integer bet;
}
