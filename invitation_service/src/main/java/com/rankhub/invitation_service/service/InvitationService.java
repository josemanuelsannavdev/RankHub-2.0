package com.rankhub.invitation_service.service;

import java.util.List;
import java.util.UUID;

import com.rankhub.invitation_service.dto.request.AcceptInvitationRequest;
import com.rankhub.invitation_service.dto.request.CreateInvitationRequest;
import com.rankhub.invitation_service.dto.response.InvitationResponse;

public interface InvitationService {
    
    InvitationResponse createInvitation(CreateInvitationRequest request, UUID userId);

    List<InvitationResponse> getInvitationsByRankingId(UUID rankingId);
    
    InvitationResponse acceptInvitation(AcceptInvitationRequest request);
    InvitationResponse cancelInvitation(UUID invitationId);
}
