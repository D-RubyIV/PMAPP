package com.example.app.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignInRequests {
    @NotBlank(message = "email is required")
    private String email;
    @NotBlank(message = "password is required")
    private String password;
}
