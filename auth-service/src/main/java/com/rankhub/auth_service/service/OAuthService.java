package com.rankhub.auth_service.service;


import com.rankhub.auth_service.entity.User;
import com.rankhub.auth_service.entity.Role;
import com.rankhub.auth_service.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class OAuthService {

    private final UserRepository userRepository;

    public OAuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User processOAuthUser(String email) {

        return userRepository.findByEmail(email)
                .orElseGet(() -> createNewUser(email));
    }

    private User createNewUser(String email) {

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setRole(Role.USER);
        newUser.setProvider("GOOGLE");

        return userRepository.save(newUser);
    }
}
