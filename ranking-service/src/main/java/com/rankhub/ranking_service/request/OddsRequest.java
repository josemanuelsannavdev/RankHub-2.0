package com.rankhub.ranking_service.request;

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
public class OddsRequest {
    private List<UUID> blueSidePlayerIds;
    private List<UUID> redSidePlayerIds;
    private String gameName;
    private UUID rankingId;
}
