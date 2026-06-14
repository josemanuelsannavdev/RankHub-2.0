package com.rankhub.bets_service.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.rankhub.bets_service.dto.EventDto;
import com.rankhub.bets_service.entity.Event;
import com.rankhub.bets_service.repository.EventRepository;
import com.rankhub.bets_service.request.EventRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;

    @Override
    public EventDto createEvent(EventRequest eventRequest) {
        Event event = Event.builder()
                .rankingId(eventRequest.getRankingId())
                .gameName(eventRequest.getGameName())
                .status("PENDING")
                .date(new Timestamp(System.currentTimeMillis()))
                .build();

        Event savedEvent = eventRepository.save(event);
        return EventDto.builder()
                .id(savedEvent.getId())
                .rankingId(savedEvent.getRankingId())
                .gameName(savedEvent.getGameName())
                .status(savedEvent.getStatus())
                .date(savedEvent.getDate())
                .build();
    }

    @Override
    public EventDto getEventById(UUID eventId) {
        Event event = eventRepository.findById(eventId);

        return EventDto.builder()
                .id(event.getId())
                .rankingId(event.getRankingId())
                .gameName(event.getGameName())
                .status(event.getStatus())
                .date(event.getDate())
                .build();
    }

    @Override
    public List<EventDto> getEventsByRankingId(UUID rankingId) {
        List<Event> events = eventRepository.findByRankingId(rankingId);
        return events.stream()
                .map(event -> EventDto.builder()
                        .id(event.getId())
                        .rankingId(event.getRankingId())
                        .gameName(event.getGameName())
                        .status(event.getStatus())
                        .date(event.getDate())
                        .build())
                .toList();
    }

}
