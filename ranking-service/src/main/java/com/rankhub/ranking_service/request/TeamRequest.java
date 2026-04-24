package com.rankhub.ranking_service.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class TeamRequest {

    @NotNull
    @Size(min = 1, max = 80)
    private String name;

    @Positive
    private int position;

    @PositiveOrZero
    private int points;

    @NotEmpty
    @Valid
    private List<TeamMemberRequest> members;
}
