package com.rankhub.ranking_service.request;



import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameNameRequest {
    
    private String name;
    private UUID rankingId;
}
