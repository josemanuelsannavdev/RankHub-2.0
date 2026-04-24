package com.rankhub.ranking_service.mapper;

import org.springframework.stereotype.Component;

import com.rankhub.ranking_service.dto.ParticipantDto;
import com.rankhub.ranking_service.entity.Participant;
import com.rankhub.ranking_service.request.ParticipantRequest;

@Component
public class ParticipantMapper {

    public Participant toEntity(ParticipantRequest request, java.util.UUID gameId) {
        if (request == null) {
            return null;
        }

        Participant participant = new Participant();
        participant.setGameId(gameId);
        participant.setPlayerId(request.getPlayerId());
        participant.setGuestName(request.getGuestName() != null ? request.getGuestName().trim() : null);
        participant.setPosition(request.getPosition());
        participant.setPoints(request.getPoints());
        return participant;
    }

    public ParticipantDto toDto(Participant entity) {
        if (entity == null) {
            return null;
        }

        ParticipantDto participantDto = new ParticipantDto();
        participantDto.setId(entity.getId());
        participantDto.setPlayerId(entity.getPlayerId());
        participantDto.setGuestName(entity.getGuestName());
        participantDto.setPosition(entity.getPosition());
        participantDto.setPoints(entity.getPoints());
        return participantDto;
    }
}