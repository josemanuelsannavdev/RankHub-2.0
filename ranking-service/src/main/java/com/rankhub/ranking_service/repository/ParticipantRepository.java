package com.rankhub.ranking_service.repository;

import java.util.List;

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
}
