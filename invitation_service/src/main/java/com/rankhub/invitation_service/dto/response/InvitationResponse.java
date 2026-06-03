package com.rankhub.invitation_service.dto.response;

import com.rankhub.invitation_service.enums.InvitationStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvitationResponse {

        private UUID id;

        private UUID rankingId;

        private String email;

        private InvitationStatus status;

        private LocalDateTime expiresAt;

        private LocalDateTime createdAt;


}
