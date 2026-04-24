package com.rankhub.ranking_service.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class IndividualGameDto {
    private UUID id;
    private String name;
    private UUID rankingId;
    private String date;
    private String type;
    private List<ParticipantDto> participants;
}
