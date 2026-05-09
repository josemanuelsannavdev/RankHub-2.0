package com.rankhub.ranking_service.mapper;

import org.springframework.stereotype.Component;

import com.rankhub.ranking_service.dto.RankingDto;
import com.rankhub.ranking_service.entity.Ranking;
import com.rankhub.ranking_service.request.RankingRequest;

@Component
public class RankingMapper {

    // Request → Entity
    public Ranking toEntity(RankingRequest request) {
        if (request == null) {
            return null;
        }

        Ranking ranking = new Ranking();

        ranking.setName(request.getName());
        ranking.setIcon(request.getIcon());
        ranking.setDescription(request.getDescription());
        return ranking;
    }

    // Entity → Response DTO
    public RankingDto toDto(Ranking entity) {
        if (entity == null) {
            return null;
        }
        RankingDto rankingDto = new RankingDto();
        rankingDto.setId(entity.getId());
        rankingDto.setName(entity.getName());
        rankingDto.setIcon(entity.getIcon());
        rankingDto.setDescription(entity.getDescription());
        return rankingDto;
    }

   
}
