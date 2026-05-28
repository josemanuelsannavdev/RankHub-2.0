package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import com.rankhub.ranking_service.dto.DuelGameDto;
import com.rankhub.ranking_service.dto.IndividualGameDto;
import com.rankhub.ranking_service.dto.TeamGameDto;
import com.rankhub.ranking_service.entity.Game;
import com.rankhub.ranking_service.entity.Player;
import com.rankhub.ranking_service.request.DuelGameRequest;
import com.rankhub.ranking_service.request.IndividualGameRequest;
import com.rankhub.ranking_service.request.TeamGameRequest;

import jakarta.validation.Valid;

public interface GameService {
    
    
    List<Object> getAllGamesDetailed(UUID rankingId);

    IndividualGameDto createIndividualGame(IndividualGameRequest request);

    TeamGameDto createTeamGame(TeamGameRequest request);

    DuelGameDto createDuelGame(DuelGameRequest request);

    void deletePlayerFromDuels(Player player);

    Object getGameDetailed(UUID gameId);

    List<UUID> getGameIdsByRankingIdAndGameName(UUID rankingId,String gameName);

}    
