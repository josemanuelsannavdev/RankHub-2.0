package com.rankhub.bets_service.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.rankhub.bets_service.dto.BetDto;
import com.rankhub.bets_service.entity.Bet;
import com.rankhub.bets_service.repository.BetRepository;
import com.rankhub.bets_service.repository.SideRepository;
import com.rankhub.bets_service.request.BetRequest;

import lombok.RequiredArgsConstructor;
import com.rankhub.bets_service.entity.Side;

@Service
@RequiredArgsConstructor
public class BetServiceImpl implements BetService {

    private final BetRepository betRepository;
    private final SideRepository sideRepository;

    @Override
    public Bet createBet(BetRequest betRequest, UUID eventId) {

        List<Side> sides = sideRepository.findByEventId(eventId);
        Side side = sides.stream()
                .filter(s -> s.getType().equals(betRequest.getSide()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Side not found in any side for the given event"));

        Bet bet = Bet.builder()
                .eventId(eventId)
                .sideId(side.getId())
                .playerId(betRequest.getPlayerId())
                .points(betRequest.getPoints())
                .status("PENDING")
                .playerName(betRequest.getPlayerName())
                .playerImage(betRequest.getPlayerImage())
                .creatorName(betRequest.getCreatorName())
                .build();

        return betRepository.save(bet);

    }

    @Override
    public List<BetDto> getBetsByEventId(UUID eventId) {
        List<Bet> bets = betRepository.findByEventId(eventId);

        return bets.stream()
                .map(bet -> BetDto.builder()
                        .id(bet.getId())
                        .eventId(bet.getEventId())
                        .sideId(bet.getSideId())
                        .playerId(bet.getPlayerId())
                        .points(bet.getPoints())
                        .status(bet.getStatus())
                        .playerName(bet.getPlayerName())
                        .playerImage(bet.getPlayerImage())
                        .creatorName(bet.getCreatorName())
                        .build())
                .toList();
    }

        @Override
        public void deleteBet(UUID betId) {
            betRepository.deleteById(betId);
        }

        @Override
        public Bet getBetById(UUID betId) {
            return betRepository.findById(betId);
                    
        }

        @Override
        public void updateBet(Bet bet) {
            betRepository.save(bet);
        }
}
