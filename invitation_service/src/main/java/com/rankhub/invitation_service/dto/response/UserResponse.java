package com.rankhub.invitation_service.dto.response;




import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UserResponse {
    private UUID id;
    private String email;
    private RoleType role;
}

enum RoleType {
    ADMIN,
    SUB_ADMIN,
    GUEST
}