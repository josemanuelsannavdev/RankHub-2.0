package com.rankhub.ranking_service.request;

import java.util.UUID;

import jakarta.validation.constraints.AssertTrue;
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
public class ParticipantRequest {
    
    private UUID playerId;

    @Size(min = 1, max = 80)
    private String guestName;

    @Positive
    private int position;

    @PositiveOrZero
    private int points;

    @AssertTrue(message = "Provide exactly one of playerId or guestName")
    public boolean isPlayerOrGuestValid() {
        boolean hasPlayerId = playerId != null;
        boolean hasGuestName = guestName != null && !guestName.trim().isEmpty();
        return hasPlayerId ^ hasGuestName;
    }
}
