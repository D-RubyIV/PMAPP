package com.example.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "categories")
public class CategoryEntity extends BaseEntity {
    @NotNull
    @NotBlank
    private String name;
    @NotNull
    @NotBlank
    private String code;
}
