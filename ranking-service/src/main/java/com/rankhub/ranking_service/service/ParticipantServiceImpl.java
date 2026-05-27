package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rankhub.ranking_service.dto.PlayerDto;
import com.rankhub.ranking_service.entity.Participant;
import com.rankhub.ranking_service.entity.Player;
import com.rankhub.ranking_service.entity.Team;
import com.rankhub.ranking_service.entity.TeamMember;
import com.rankhub.ranking_service.mapper.PlayerMapper;
import com.rankhub.ranking_service.repository.DuelRepository;
import com.rankhub.ranking_service.repository.HistoricoRepository;
import com.rankhub.ranking_service.repository.ParticipantRepository;
import com.rankhub.ranking_service.repository.PlayerRepository;
import com.rankhub.ranking_service.repository.TeamMemberRepository;
import com.rankhub.ranking_service.request.PlayerRequest;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ParticipantServiceImpl implements ParticipantService {
    private final ParticipantRepository participantRepository;
    private final PlayerRepository playerRepository;

    @Override
    public List<Participant> getAllParticipantsByPlayerId(UUID playerId) {
        return participantRepository.findAllByPlayerId(playerId);
    }

    @Override
    public void playerToGuest(UUID playerId) {
        Player player = playerRepository.getPlayerById(playerId);
        if (player == null) {
            throw new IllegalArgumentException("Jugador no encontrado: " + playerId);
        }
        List<Participant> participants = participantRepository.findAllByPlayerId(playerId);
        for (Participant participant : participants) {

            participant.setPlayerId(null);
            participant.setGuestName("Invitado: " + player.getName());
        }
        participantRepository.saveAll(participants);
    }

}