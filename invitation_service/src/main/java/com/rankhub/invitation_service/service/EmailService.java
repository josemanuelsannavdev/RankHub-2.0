package com.rankhub.invitation_service.service;

import com.rankhub.invitation_service.entity.Invitation;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.MailException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final String fromEmail;

    public EmailService(JavaMailSender mailSender,
                        @Value("${resend.from-email:onboarding@tuapp.com}") String fromEmail) {
        this.mailSender = mailSender;
        this.fromEmail = fromEmail;
    }

    public void sendEmail(Invitation invitation) {
        String link = "http://localhost:8085/invitation/accept?token=" + invitation.getToken();
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(invitation.getEmail());
            helper.setSubject("Prueba Spring");
            helper.setText(buildHtml(link), true);

            mailSender.send(mimeMessage);
        } catch (MailException | MessagingException ex) {
            log.error("Failed to send invitation email to {}: {}", invitation.getEmail(), ex.getMessage());
            throw new RuntimeException("Failed to send invitation email", ex);
        }
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