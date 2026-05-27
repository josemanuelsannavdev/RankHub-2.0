package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import com.rankhub.ranking_service.dto.PlayerDto;
import com.rankhub.ranking_service.entity.Participant;
import com.rankhub.ranking_service.entity.TeamMember;
import com.rankhub.ranking_service.request.PlayerRequest;

public interface ParticipantService {

    List<Participant> getAllParticipantsByPlayerId(UUID playerId);

    void playerToGuest(UUID playerId);
} 