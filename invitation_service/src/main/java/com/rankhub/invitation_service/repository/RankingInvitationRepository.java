package com.rankhub.invitation_service.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.invitation_service.entity.Invitation;
import com.rankhub.invitation_service.enums.InvitationStatus;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RankingInvitationRepository {
    private final RankingInvitationJpaRepository rankingInvitationJpaRepository;

    public boolean existsByRankingIdAndEmailAndStatus(
            UUID rankingId,
            String email,
            InvitationStatus status) {
        return rankingInvitationJpaRepository.existsByRankingIdAndEmailAndStatus(rankingId, email, status);
    }

    public Optional<Invitation> findByToken(String token) {
        return rankingInvitationJpaRepository.findByToken(token);
    }

    public void save(Invitation invitation) {
        rankingInvitationJpaRepository.save(invitation);
    }

    public List<Invitation> findAllByRankingId(UUID rankingId) {
        return rankingInvitationJpaRepository.findAllByRankingId(rankingId);
    }

    public Optional<Invitation> findById(UUID invitationId) {
        return rankingInvitationJpaRepository.findById(invitationId);
    }
}
