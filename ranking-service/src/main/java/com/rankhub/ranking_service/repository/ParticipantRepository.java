package com.rankhub.ranking_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.ranking_service.entity.Participant;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ParticipantRepository {

    private final ParticipantJpaRepository participantJpaRepository;

    public List<Participant> saveAll(List<Participant> participants) {
        return participantJpaRepository.saveAll(participants);
    }

    public List<Participant> findByGameIdIn(List<UUID> gameIds) {
        return participantJpaRepository.findByGameIdIn(gameIds);
    }

    public List<Participant> findByGameId(UUID gameId) {
        return participantJpaRepository.findByGameId(gameId);
    }

    public void deleteByPlayerId(UUID playerId) {
        participantJpaRepository.deleteByPlayerId(playerId);
    }

    public List<Participant> findAllByPlayerId(UUID playerId) {
        return participantJpaRepository.findAllByPlayerId(playerId);
    }
}
