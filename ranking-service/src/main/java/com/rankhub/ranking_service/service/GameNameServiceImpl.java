package com.rankhub.ranking_service.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rankhub.ranking_service.dto.GameNameDto;
import com.rankhub.ranking_service.dto.IndividualGameDto;
import com.rankhub.ranking_service.dto.ParticipantDto;
import com.rankhub.ranking_service.dto.TeamDto;
import com.rankhub.ranking_service.dto.TeamGameDto;
import com.rankhub.ranking_service.dto.TeamMemberDto;
import com.rankhub.ranking_service.entity.Game;
import com.rankhub.ranking_service.entity.GameName;
import com.rankhub.ranking_service.entity.Participant;
import com.rankhub.ranking_service.entity.Player;
import com.rankhub.ranking_service.entity.Team;
import com.rankhub.ranking_service.entity.TeamMember;
import com.rankhub.ranking_service.entity.utils.GameType;
import com.rankhub.ranking_service.mapper.GameMapper;
import com.rankhub.ranking_service.mapper.GameNameMapper;
import com.rankhub.ranking_service.mapper.ParticipantMapper;
import com.rankhub.ranking_service.mapper.TeamMapper;
import com.rankhub.ranking_service.mapper.TeamMemberMapper;
import com.rankhub.ranking_service.repository.GameNameRepository;
import com.rankhub.ranking_service.repository.GameRepository;
import com.rankhub.ranking_service.repository.ParticipantRepository;
import com.rankhub.ranking_service.repository.PlayerRepository;
import com.rankhub.ranking_service.repository.TeamMemberRepository;
import com.rankhub.ranking_service.repository.TeamRepository;
import com.rankhub.ranking_service.request.GameNameRequest;
import com.rankhub.ranking_service.request.IndividualGameRequest;
import com.rankhub.ranking_service.request.TeamMemberRequest;
import com.rankhub.ranking_service.request.TeamGameRequest;
import com.rankhub.ranking_service.request.TeamRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameNameServiceImpl implements GameNameService {

    private final GameNameRepository gameNameRepository;
    private final GameNameMapper gameNameMapper;
    
    @Override
    public List<GameNameDto> findAllByRankingId(UUID rankingId) {
        List<GameName> gameNames = gameNameRepository.findAllByRankingId(rankingId);
        if(gameNames == null || gameNames.isEmpty()) {
            return Collections.emptyList();
        }
        return gameNames.stream()
                .map(gameNameMapper::toDto)
                .toList();
    }

    @Override
    public GameNameDto createGameName(GameNameRequest gameNameRequest) {
        GameName gameName = gameNameMapper.toEntity(gameNameRequest);
        GameName savedGameName = gameNameRepository.save(gameName);
        
        return gameNameMapper.toDto(savedGameName);
    }
}
