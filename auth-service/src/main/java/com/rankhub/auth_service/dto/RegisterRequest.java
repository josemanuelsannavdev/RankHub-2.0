package com.rankhub.auth_service.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/*
Se usa para recibir los datos del cliente desde el front, postman... 
Así no usamos directamente la entidad User.
Este DTO esta pensado exclusivamente para los registros en el formulario con Email y contraseña
*/

@Data
public class RegisterRequest {

    @Email //valida el correcto formato del email
    @NotBlank //no permite que sea null ni vacio
    private String email;

    @NotBlank
    private String password;

}
