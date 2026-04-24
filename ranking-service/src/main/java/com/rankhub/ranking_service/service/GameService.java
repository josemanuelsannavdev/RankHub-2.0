package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import com.rankhub.ranking_service.dto.IndividualGameDto;
import com.rankhub.ranking_service.dto.TeamGameDto;
import com.rankhub.ranking_service.entity.Game;
import com.rankhub.ranking_service.request.IndividualGameRequest;
import com.rankhub.ranking_service.request.TeamGameRequest;

public interface GameService {
    
    List<Game> getAllGamesOfRanking(UUID rankingId);

    IndividualGameDto createIndividualGame(IndividualGameRequest request);

    TeamGameDto createTeamGame(TeamGameRequest request);
}
