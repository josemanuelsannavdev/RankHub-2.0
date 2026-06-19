package com.rankhub.bets_service.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.rankhub.bets_service.client.RankingServiceClient;
import com.rankhub.bets_service.dto.BetDto;
import com.rankhub.bets_service.dto.EventDto;
import com.rankhub.bets_service.dto.PlayerDto;
import com.rankhub.bets_service.dto.SideDto;
import com.rankhub.bets_service.entity.Bet;
import com.rankhub.bets_service.entity.Event;
import com.rankhub.bets_service.entity.Side;
import com.rankhub.bets_service.entity.SidePlayer;
import com.rankhub.bets_service.repository.EventRepository;
import com.rankhub.bets_service.repository.SidePlayerRepository;
import com.rankhub.bets_service.request.EventRequest;
import com.rankhub.bets_service.request.PlayerRequest;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import com.rankhub.bets_service.repository.SideRepository;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
        private final EventRepository eventRepository;
        private final RankingServiceClient rankingServiceClient;
        private final SideRepository sideRepository;
        private final SidePlayerRepository sidePlayerRepository;
        private final BetService betService;
        
        @Override
        @Transactional
        public EventDto createEvent(EventRequest eventRequest) {
                Event event = Event.builder()
                                .rankingId(eventRequest.getRankingId())
                                .gameName(eventRequest.getGameName())
                                .status("PENDING")
                                .date(new Timestamp(System.currentTimeMillis()))
                                .creatorName(eventRequest.getCreatorName())
                                .build();

                Event savedEvent = eventRepository.save(event);

                List<UUID> blueSidePlayerIds = eventRequest.getBlueSidePlayers().stream()
                                .map(PlayerRequest::getId)
                                .toList();
                List<UUID> redSidePlayerIds = eventRequest.getRedSidePlayers().stream()
                                .map(PlayerRequest::getId)
                                .toList();

                // Crear los lados azul y rojo para el evento
                Map<String, Double> odds = rankingServiceClient.getOddsForEvent(blueSidePlayerIds,
                                redSidePlayerIds, eventRequest.getGameName(), eventRequest.getRankingId());
                Double blueOdd = odds.get("blueOdds"); // Valor de las odds para el lado azul
                Side blueSide = Side.builder()
                                .odds(blueOdd)
                                .win(false)
                                .eventId(savedEvent.getId())
                                .type("blueSide")
                                .build();
                Double redOdd = odds.get("redOdds"); // Valor de las odds para el lado rojo
                Side redSide = Side.builder()
                                .odds(redOdd)
                                .win(false)
                                .eventId(savedEvent.getId())
                                .type("redSide")
                                .build();

                Side savedBlueSide = sideRepository.save(blueSide);
                Side savedRedSide = sideRepository.save(redSide);

                // crear los jugadores
                for (PlayerRequest playerRequest : eventRequest.getBlueSidePlayers()) {
                        sidePlayerRepository.save(SidePlayer.builder()
                                        .sideId(savedBlueSide.getId())
                                        .name(playerRequest.getName())
                                        .image(playerRequest.getImage())
                                        .build());
                }
                for (PlayerRequest playerRequest : eventRequest.getRedSidePlayers()) {
                        sidePlayerRepository.save(SidePlayer.builder()
                                        .sideId(savedRedSide.getId())
                                        .name(playerRequest.getName())
                                        .image(playerRequest.getImage())
                                        .build());
                }
                return EventDto.builder()
                                .id(savedEvent.getId())
                                .rankingId(savedEvent.getRankingId())
                                .gameName(savedEvent.getGameName())
                                .status(savedEvent.getStatus())
                                .date(savedEvent.getDate())
                                .creatorName(savedEvent.getCreatorName())
                                .build();
        }

        @Override
        public EventDto getEventById(UUID eventId) {
                Event event = eventRepository.findById(eventId);

                EventDto eventDto = EventDto.builder()
                                .id(event.getId())
                                .rankingId(event.getRankingId())
                                .gameName(event.getGameName())
                                .status(event.getStatus())
                                .date(event.getDate())
                                .creatorName(event.getCreatorName())
                                .build();
                List<Side> sides = sideRepository.findByEventId(eventDto.getId());
                for (Side side : sides) {
                        if (side.getType().equals("blueSide")) {
                                List<SidePlayer> sidePlayers = sidePlayerRepository.getPlayersBySideId(side.getId());
                                List<PlayerDto> sidePlayerDtos = sidePlayers.stream()
                                                .map(player -> PlayerDto.builder()
                                                                .name(player.getName())
                                                                .image(player.getImage())
                                                                .build())
                                                .toList();
                                eventDto.setBlueSide(SideDto.builder()
                                                .odds(side.getOdds())
                                                .win(side.getWin())
                                                .players(sidePlayerDtos)
                                                .id(side.getId())
                                                .build());

                        } else if (side.getType().equals("redSide")) {
                                List<SidePlayer> sidePlayers = sidePlayerRepository.getPlayersBySideId(side.getId());
                                List<PlayerDto> sidePlayerDtos = sidePlayers.stream()
                                                .map(player -> PlayerDto.builder()
                                                                .name(player.getName())
                                                                .image(player.getImage())
                                                                .build())
                                                .toList();
                                eventDto.setRedSide(SideDto.builder()
                                                .odds(side.getOdds())
                                                .win(side.getWin())
                                                .players(sidePlayerDtos)
                                                .id(side.getId())
                                                .build());
                        }
                }
                return eventDto;
        }

        @Override
        public List<EventDto> getEventsByRankingId(UUID rankingId) {
                List<Event> events = eventRepository.findByRankingId(rankingId);
                List<EventDto> eventDtos = events.stream()
                                .map(event -> EventDto.builder()
                                                .id(event.getId())
                                                .rankingId(event.getRankingId())
                                                .gameName(event.getGameName())
                                                .status(event.getStatus())
                                                .date(event.getDate())
                                                .creatorName(event.getCreatorName())
                                                .build())
                                .toList();
                for (EventDto event : eventDtos) {
                        List<Side> sides = sideRepository.findByEventId(event.getId());
                        for (Side side : sides) {
                                if (side.getType().equals("blueSide")) {
                                        List<SidePlayer> sidePlayers = sidePlayerRepository
                                                        .getPlayersBySideId(side.getId());
                                        List<PlayerDto> sidePlayerDtos = sidePlayers.stream()
                                                        .map(player -> PlayerDto.builder()
                                                                        .name(player.getName())
                                                                        .image(player.getImage())
                                                                        .build())
                                                        .toList();
                                        event.setBlueSide(SideDto.builder()
                                                        .odds(side.getOdds())
                                                        .win(side.getWin())
                                                        .players(sidePlayerDtos)
                                                        .id(side.getId())
                                                        .build());

                                } else if (side.getType().equals("redSide")) {
                                        List<SidePlayer> sidePlayers = sidePlayerRepository
                                                        .getPlayersBySideId(side.getId());
                                        List<PlayerDto> sidePlayerDtos = sidePlayers.stream()
                                                        .map(player -> PlayerDto.builder()
                                                                        .name(player.getName())
                                                                        .image(player.getImage())
                                                                        .build())
                                                        .toList();
                                        event.setRedSide(SideDto.builder()
                                                        .odds(side.getOdds())
                                                        .win(side.getWin())
                                                        .players(sidePlayerDtos)
                                                        .id(side.getId())
                                                        .build());
                                }
                        }
                
                
                        event.setBets(betService.getBetsByEventId(event.getId()));
                }
                
                
                
                return eventDtos;
        }

        @Override
        public void closeEvent(UUID eventId) {
                Event event = eventRepository.findById(eventId);
                event.setStatus("CLOSED");
                eventRepository.save(event);
        }

        @Override
        @Transactional
        public void finishEvent(UUID eventId, UUID sideId) {
                Event event = eventRepository.findById(eventId);
                event.setStatus("FINISHED");
                eventRepository.save(event);
                List<BetDto> bets = betService.getBetsByEventId(eventId);
                Map<UUID, Double> betsPointsMap = new java.util.HashMap<>();
                List<Side> sides = sideRepository.findByEventId(eventId);
                for (Side side : sides) {
                        if (side.getId().equals(sideId)) {
                                side.setWin(true);
                        } else {
                                side.setWin(false);
                        }
                        sideRepository.save(side);
                        List<BetDto> sideBets = bets.stream()
                                        .filter(bet -> bet.getSideId().equals(side.getId()))
                                        .toList();
                        for (BetDto betDto : sideBets) {
                                if (side.getWin()) {
                                        betDto.setStatus("CLOSED");
                                        Double points = betDto.getPoints() * (side.getOdds() - 1);
                                        betsPointsMap.put(betDto.getPlayerId(), points);
                                } else {
                                        betDto.setStatus("CLOSED");
                                        betsPointsMap.put(betDto.getPlayerId(), (double) (betDto.getPoints() * -1));
                                }
                                Bet bet = betService.getBetById(betDto.getId());
                                bet.setStatus(betDto.getStatus());
                                betService.updateBet(bet);
                        }                        
                }


               rankingServiceClient.addBetPoints(betsPointsMap); 
        }

}
