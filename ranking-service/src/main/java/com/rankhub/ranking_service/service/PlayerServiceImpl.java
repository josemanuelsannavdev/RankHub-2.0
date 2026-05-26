package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rankhub.ranking_service.dto.PlayerDto;
import com.rankhub.ranking_service.entity.Player;
import com.rankhub.ranking_service.mapper.PlayerMapper;
import com.rankhub.ranking_service.repository.PlayerRepository;
import com.rankhub.ranking_service.request.PlayerRequest;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepository;
    private final PlayerMapper mapper;

    @Override
    public List<PlayerDto> getAllPlayersOfRanking(UUID rankingId) {
        List<Player> players = playerRepository.getAllPlayersOfRanking(rankingId);
        return players.stream().map(mapper::toDto).toList();
    }

    @Override
    public PlayerDto getPlayerById(UUID id) {
        Player player = playerRepository.getPlayerById(id);
        if (player == null) {
            throw new IllegalArgumentException("Jugador no encontrado: " + id);
        }
        return mapper.toDto(player);
    }

    @Override
    @Transactional
    public PlayerDto createPlayer(PlayerRequest playerRequest) {
        String normalizedName = playerRequest.getName() != null ? playerRequest.getName().trim() : null;

        if (normalizedName != null && playerRepository.existsByNameIgnoreCase(normalizedName)) {
            throw new IllegalArgumentException("Player ya existente, cambiar nombre");
        }

        Player newPlayer = playerRepository.save(Player.builder()
                .name(normalizedName)
                .gamesLost(0)
                .gamesWon(0)
                .gamesPlayed(0)
                .points(0.0)
                .image(playerRequest.getImage())
                .rankingId(playerRequest.getRankingId())
                .build());

        return mapper.toDto(newPlayer);
    }

    @Override
    @Transactional
    public PlayerDto updatePlayer(UUID playerId, PlayerRequest playerRequest) {

        Player existingPlayer = playerRepository.getPlayerById(playerId);
        if (existingPlayer == null) {
            throw new IllegalArgumentException("Jugador no encontrado: " + playerId);
        }

        existingPlayer.setName(playerRequest.getName() != null ? playerRequest.getName().trim() : existingPlayer.getName());
        
        existingPlayer.setImage(playerRequest.getImage() != null ? playerRequest.getImage() : existingPlayer.getImage());

        return mapper.toDto(playerRepository.save(existingPlayer));
    }

    @Override
    @Transactional
    public PlayerDto patchPlayer(UUID playerId, PlayerRequest playerRequest) {
        Player existingPlayer = playerRepository.getPlayerById(playerId);
        if (existingPlayer == null) {
            throw new IllegalArgumentException("Jugador no encontrado: " + playerId);
        }
        if (playerRequest.getName() != null) {
            existingPlayer.setName(playerRequest.getName().trim());
        }
        return mapper.toDto(playerRepository.save(existingPlayer));
    }

}