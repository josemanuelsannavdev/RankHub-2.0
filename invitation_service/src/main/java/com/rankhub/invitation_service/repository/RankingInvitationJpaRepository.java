package com.rankhub.invitation_service.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.rankhub.invitation_service.entity.Invitation;
import com.rankhub.invitation_service.enums.InvitationStatus;


public interface RankingInvitationJpaRepository extends JpaRepository<Invitation, UUID>,JpaSpecificationExecutor<Invitation> {
    
    boolean existsByRankingIdAndEmailAndStatus(
            UUID rankingId,
            String email,
            InvitationStatus status
    );

    Optional<Invitation> findByToken(String token);

    List<Invitation> findAllByRankingId(UUID rankingId);
}
