package com.rankhub.ranking_service.mapper;

import org.springframework.stereotype.Component;

import com.rankhub.ranking_service.dto.PlayerDto;
import com.rankhub.ranking_service.entity.Player;
import com.rankhub.ranking_service.request.PlayerRequest;

@Component
public class PlayerMapper {

    // Request → Entity
    public Player toEntity(PlayerRequest request) {
        if (request == null) {
            return null;
        }

        Player player = new Player();

        player.setName(request.getName());
        return player;
    }

    // Entity → Response DTO
    public PlayerDto toDto(Player entity) {
        if (entity == null) {
            return null;
        }
        PlayerDto playerDto = new PlayerDto();
        playerDto.setName(entity.getName());
        playerDto.setPoints(entity.getPoints());
        playerDto.setGamesPlayed(entity.getGamesPlayed());
        playerDto.setGamesLost(entity.getGamesLost());
        playerDto.setGamesWon(entity.getGamesWon());
        playerDto.setImage(entity.getImage());
        return playerDto;
    }

}
