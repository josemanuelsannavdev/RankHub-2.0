package com.rankhub.ranking_service.request;

import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RankingRequest {
    @Size(max = 80)
    private String name;

    @Size(max = 255)
    private String icon;
}
