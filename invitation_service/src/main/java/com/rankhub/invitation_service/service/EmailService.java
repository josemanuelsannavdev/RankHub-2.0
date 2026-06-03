package com.rankhub.invitation_service.service;

import com.rankhub.invitation_service.entity.Invitation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(Invitation invitation) {
        String link = "http://localhost:8085/invitation/accept?token="
                + invitation.getToken();
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("teuscarapoyen@gmail.com");
        message.setTo(invitation.getEmail());
        message.setSubject("Prueba Spring");
        message.setText(buildHtml(link));

        mailSender.send(message);
    }

    private String buildHtml(String link) {
        return """
                <div style="font-family: Arial;">
                    <h2>Has sido invitado a un ranking</h2>
                    <p>Haz clic para aceptar la invitación:</p>
                    <a href="%s">Aceptar invitación</a>
                </div>
                """.formatted(link);
    }

}