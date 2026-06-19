package com.rankhub.bets_service.service;

import java.util.List;
import java.util.UUID;

import com.rankhub.bets_service.dto.EventDto;
import com.rankhub.bets_service.request.EventRequest;

public interface EventService {
    
    public EventDto createEvent(EventRequest eventRequest);

    public EventDto getEventById(UUID eventId);

    public List<EventDto> getEventsByRankingId(UUID rankingId);

    public void closeEvent(UUID eventId);

    public void finishEvent(UUID eventId, UUID sideId);

    
}
