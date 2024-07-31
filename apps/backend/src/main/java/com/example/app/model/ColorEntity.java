package com.example.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "colors")
public class ColorEntity extends BaseEntity {
    @NotBlank
    @NotNull
    private String name;
    @NotNull
    @NotBlank
    private String code;
}
