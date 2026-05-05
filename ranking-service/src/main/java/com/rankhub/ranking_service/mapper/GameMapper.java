package com.rankhub.ranking_service.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.rankhub.ranking_service.dto.DuelGameDto;
import com.rankhub.ranking_service.dto.GameDto;
import com.rankhub.ranking_service.dto.IndividualGameDto;
import com.rankhub.ranking_service.dto.ParticipantDto;
import com.rankhub.ranking_service.dto.TeamDto;
import com.rankhub.ranking_service.dto.TeamGameDto;
import com.rankhub.ranking_service.entity.Game;
import com.rankhub.ranking_service.entity.utils.GameType;
import com.rankhub.ranking_service.request.DuelGameRequest;
import com.rankhub.ranking_service.request.IndividualGameRequest;
import com.rankhub.ranking_service.request.TeamGameRequest;

@Component
public class GameMapper {
    
    //Individual Game Request → Entity
    public Game toEntity(IndividualGameRequest request, GameType type) {
        if (request == null) {
            return null;
        }

        Game game = new Game();

        game.setRankingId(request.getRankingId());
        game.setName(request.getName());  
        game.setDate(new java.sql.Timestamp(System.currentTimeMillis())); // Establecer la fecha actual
        game.setType(type);

        return game;
    }

    //Team Game Request → Entity
    public Game toEntity(TeamGameRequest request, GameType type) {
        if (request == null) {
            return null;
        }

        Game game = new Game();

        game.setRankingId(request.getRankingId());
        game.setName(request.getName());
        game.setDate(new java.sql.Timestamp(System.currentTimeMillis())); // Establecer la fecha actual
        game.setType(type);

        return game;
    }

    //Duel Game Request → Entity
    public Game toEntity(DuelGameRequest request, GameType type) {
        if (request == null) {
            return null;
        }

        Game game = new Game();

        game.setRankingId(request.getRankingId());
        game.setName(request.getName());
        game.setDate(new java.sql.Timestamp(System.currentTimeMillis())); // Establecer la fecha actual
        game.setType(type);

        return game;
    }

    //Entity → Response DTO
    public GameDto toResponse(Game game) {
        if (game == null) {
            return null;
        }

        GameDto response = new GameDto();

        response.setId(game.getId());
        response.setRankingId(game.getRankingId());
        response.setName(game.getName());
        response.setDate(game.getDate() != null ? game.getDate().toString() : null);
        response.setType(game.getType() != null ? game.getType().toString() : null);

        return response;
    }

    //Entity → IndividualGameDto
    public IndividualGameDto toIndividualGameDto(Game game, List<ParticipantDto> participants) {
        if (game == null) {
            return null;
        }

        IndividualGameDto response = new IndividualGameDto();
        response.setId(game.getId());
        response.setRankingId(game.getRankingId());
        response.setName(game.getName());
        response.setDate(game.getDate() != null ? game.getDate().toString() : null);
        response.setType(game.getType() != null ? game.getType().toString() : null);
        response.setParticipants(participants);
        return response;
    }

    //Entity → TeamGameDto
    public TeamGameDto toTeamGameDto(Game game, List<TeamDto> teams) {
        if (game == null) {
            return null;
        }

        TeamGameDto response = new TeamGameDto();
        response.setId(game.getId());
        response.setRankingId(game.getRankingId());
        response.setName(game.getName());
        response.setDate(game.getDate() != null ? game.getDate().toString() : null);
        response.setType(game.getType() != null ? game.getType().toString() : null);
        response.setTeams(teams);
        return response;
    }

    //Entity → DuelGameDto
    public DuelGameDto toDuelGameDto(Game game) {
        if (game == null) {
            return null;
        }

        DuelGameDto response = new DuelGameDto();
        response.setId(game.getId());
        response.setRankingId(game.getRankingId());
        response.setName(game.getName());
        response.setDate(game.getDate() != null ? game.getDate().toString() : null);
        response.setType(game.getType() != null ? game.getType().toString() : null);
        return response;
    }

}
