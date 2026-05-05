package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import com.rankhub.ranking_service.dto.GameNameDto;
import com.rankhub.ranking_service.entity.GameName;
import com.rankhub.ranking_service.repository.GameNameRepository;
import com.rankhub.ranking_service.request.GameNameRequest;

public interface GameNameService {
    

    List<GameNameDto> findAllByRankingId(UUID rankingId);
    GameNameDto createGameName(GameNameRequest gameNameRequest);
}
