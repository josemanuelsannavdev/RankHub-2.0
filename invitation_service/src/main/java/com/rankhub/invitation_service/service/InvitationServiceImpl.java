package com.rankhub.invitation_service.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.rankhub.invitation_service.client.RankingClient;
import com.rankhub.invitation_service.dto.request.AcceptInvitationRequest;
import com.rankhub.invitation_service.dto.request.AddRankingMemberRequest;
import com.rankhub.invitation_service.dto.request.CreateInvitationRequest;
import com.rankhub.invitation_service.dto.response.InvitationResponse;
import com.rankhub.invitation_service.dto.response.UserResponse;
import com.rankhub.invitation_service.entity.Invitation;
import com.rankhub.invitation_service.enums.InvitationStatus;
import com.rankhub.invitation_service.repository.RankingInvitationRepository;

import lombok.RequiredArgsConstructor;
import  com.rankhub.invitation_service.exception.ConflictException;
import com.rankhub.invitation_service.exception.NotFoundException;
import com.rankhub.invitation_service.exception.BadRequestException;

@Service
@RequiredArgsConstructor
public class InvitationServiceImpl implements InvitationService {

    private final RankingInvitationRepository rankingInvitationRepository;
    private final RankingClient rankingClient;
    private final EmailService emailService;

    @Override
    public InvitationResponse createInvitation(CreateInvitationRequest request, UUID userId) {

        boolean alreadyExistsPending = rankingInvitationRepository.existsByRankingIdAndEmailAndStatus(
                request.getRankingId(),
                request.getEmail(),
                InvitationStatus.PENDING);

        if (alreadyExistsPending) {
            throw new ConflictException("Invitation already exists");
        }

        List<UserResponse> currentMembers = rankingClient.getRankingMembers(request.getRankingId());
        if (currentMembers.stream().anyMatch(user -> user.getEmail().equals(request.getEmail()))) {
            throw new ConflictException("User is already a member of the ranking");
        }
        Invitation invitation = Invitation.builder()
                .id(UUID.randomUUID())
                .rankingId(request.getRankingId())
                .email(request.getEmail())
                .invitedByUserId(userId)
                .token(generateSecureToken())
                .status(InvitationStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusDays(7))
                .build();

        emailService.sendEmail(invitation);
        rankingInvitationRepository.save(invitation);

        return new InvitationResponse(
                invitation.getId(),
                invitation.getRankingId(),
                invitation.getEmail(),
                invitation.getStatus(),
                invitation.getExpiresAt(),
                invitation.getCreatedAt());
    }

    private String generateSecureToken() {

        SecureRandom secureRandom = new SecureRandom();

        byte[] tokenBytes = new byte[32];

        secureRandom.nextBytes(tokenBytes);

        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(tokenBytes);
    }

    @Override
    public List<InvitationResponse> getInvitationsByRankingId(UUID rankingId) {

        return rankingInvitationRepository.findAllByRankingId(rankingId)
                .stream()
                .map(invitation -> new InvitationResponse(
                        invitation.getId(),
                        invitation.getRankingId(),
                        invitation.getEmail(),
                        invitation.getStatus(),
                        invitation.getExpiresAt(),
                        invitation.getCreatedAt()))
                .toList();
    }

    @Override
    public InvitationResponse acceptInvitation(AcceptInvitationRequest request) {

        Invitation invitation = rankingInvitationRepository.findByToken(request.getToken())
            .orElseThrow(() -> new NotFoundException("Invitation not found"));

        if (!invitation.getStatus().equals(InvitationStatus.PENDING)) {
            throw new BadRequestException("Invitation is not pending");
        }

        if (invitation.getExpiresAt().isBefore(LocalDateTime.now())) {
            invitation.setStatus(InvitationStatus.EXPIRED);
            rankingInvitationRepository.save(invitation);
            throw new BadRequestException("Invitation expired");
        }


        rankingClient.addMember(new AddRankingMemberRequest(
                invitation.getRankingId(),
                invitation.getEmail()));

        invitation.setStatus(InvitationStatus.ACCEPTED);

        invitation.setAcceptedAt(LocalDateTime.now());

        rankingInvitationRepository.save(invitation);

        return new InvitationResponse(
                invitation.getId(),
                invitation.getRankingId(),
                invitation.getEmail(),
                invitation.getStatus(),
                invitation.getExpiresAt(),
                invitation.getCreatedAt());
    }

    @Override
    public InvitationResponse cancelInvitation(UUID invitationId) {

        Invitation invitation = rankingInvitationRepository.findById(invitationId)
            .orElseThrow(() -> new NotFoundException("Invitation not found"));

        if (!invitation.getStatus().equals(InvitationStatus.PENDING)) {
            throw new BadRequestException("Only pending invitations can be cancelled");
        }

        invitation.setStatus(InvitationStatus.CANCELLED);

        invitation.setCancelledAt(LocalDateTime.now());

        rankingInvitationRepository.save(invitation);

        return new InvitationResponse(
                invitation.getId(),
                invitation.getRankingId(),
                invitation.getEmail(),
                invitation.getStatus(),
                invitation.getExpiresAt(),
                invitation.getCreatedAt());
    }

}
