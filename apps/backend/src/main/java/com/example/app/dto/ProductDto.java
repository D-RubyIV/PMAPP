package com.example.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDto {
    @NotNull
    @NotBlank
    private String name;
    @NotNull
    @NotBlank
    private String code;
    @NotNull 
    private float price;
    @NotNull
    private Boolean suggest;
    @NotNull
    @NotBlank
    private String description;
    private MultipartFile file;
}
