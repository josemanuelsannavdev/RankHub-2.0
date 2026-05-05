package com.rankhub.ranking_service.mapper;

import org.springframework.stereotype.Component;

import com.rankhub.ranking_service.dto.GameNameDto;
import com.rankhub.ranking_service.entity.GameName;
import com.rankhub.ranking_service.request.GameNameRequest;

@Component
public class GameNameMapper {
        //Entity →  DTO
        public GameNameDto toDto(GameName gameName) {
            if (gameName == null) {
                return null;
            }
    
            GameNameDto response = new GameNameDto();
    
            response.setRankingId(gameName.getRankingId());
            response.setName(gameName.getName());
    
            return response;
        }

        //Request  → Entity
        public GameName toEntity(GameNameRequest request) {
            if (request == null) {
                return null;
            }
    
            GameName gameName = new GameName();
            gameName.setRankingId(request.getRankingId());
            gameName.setName(request.getName());
    
            return gameName;
        }
}
