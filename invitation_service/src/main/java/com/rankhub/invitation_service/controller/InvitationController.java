package com.rankhub.invitation_service.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rankhub.invitation_service.dto.request.AcceptInvitationRequest;
import com.rankhub.invitation_service.dto.request.CreateInvitationRequest;
import com.rankhub.invitation_service.dto.response.InvitationResponse;
import com.rankhub.invitation_service.service.InvitationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController

@RequiredArgsConstructor
public class InvitationController {

    private final InvitationService invitationService;

    @PostMapping("/invitation")
    public InvitationResponse createInvitation(@Valid @RequestBody CreateInvitationRequest request,
        @RequestHeader("X-User-Id") UUID userId ) {
        
        return invitationService.createInvitation(request, userId);
    }

    @GetMapping("/invitation/ranking/{rankingId}")
    public List<InvitationResponse> getRankingInvitations(
            @PathVariable UUID rankingId) {

        return invitationService.getInvitationsByRankingId(rankingId);
    }

    @GetMapping("/invitation/accept")
    public InvitationResponse acceptInvitation(
            @Valid @RequestParam String token) {

        return invitationService.acceptInvitation(new AcceptInvitationRequest(token));
    }

    @PatchMapping("/invitation/{invitationId}/cancel")
    public InvitationResponse cancelInvitation(
            @PathVariable UUID invitationId) {

        return invitationService.cancelInvitation(invitationId);
    }

}
