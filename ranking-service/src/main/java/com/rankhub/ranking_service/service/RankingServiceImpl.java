package com.rankhub.ranking_service.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.rankhub.ranking_service.dto.RankingWithRoleDto;
import com.rankhub.ranking_service.entity.Ranking;
import com.rankhub.ranking_service.repository.RankingRepository;
import com.rankhub.ranking_service.request.RankingRequest;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {
    
    private final RankingRepository rankingRepository;

    @Override
    public List<Ranking> getAllRankings() {
        return rankingRepository.getAllRankings();
    }

    @Override
    public Ranking getRankingById(UUID id) {
        return rankingRepository.getRankingById(id);
    }

    @Override
    public Ranking createRanking(RankingRequest rankingRequest) {
        
        Ranking ranking = Ranking.builder()
                .name(rankingRequest.getName())
                .icon(rankingRequest.getIcon())
                .build();
        ranking = rankingRepository.save(ranking);

        return ranking; // Placeholder, reemplaza con la implementación real
    }

    @Override
    public Ranking updateRanking(UUID rankingId, RankingRequest rankingRequest) {
        Ranking existingRanking = rankingRepository.getRankingById(rankingId);
        if (existingRanking == null) {
            return null; // O lanza una excepción personalizada
        }

        // Actualiza los campos del ranking existente con los datos del request
        existingRanking.setName(rankingRequest.getName());
        
        // Guarda el ranking actualizado en la base de datos
        return rankingRepository.save(existingRanking);
    }

    @Override
    public Ranking patchRanking(UUID rankingId, RankingRequest request) {
        Ranking existingRanking = rankingRepository.getRankingById(rankingId);
        if (existingRanking == null) {
            return null; // O lanza una excepción personalizada
        }

        // Actualiza solo los campos que no sean nulos en el request
        if (request.getName() != null) {
            existingRanking.setName(request.getName());
        }
        
        // Guarda el ranking actualizado en la base de datos
        return rankingRepository.save(existingRanking);
    }
    
    @Override
    public List<RankingWithRoleDto> getRankingsByUserId(UUID userId) {
        return rankingRepository.getRankingsByUserId(userId);
    }

}
