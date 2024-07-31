package com.example.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tags")
public class TagEntity extends BaseEntity{

    @NotBlank
    @NotNull
    private String name;

    @NotNull
    @NotBlank
    private String code;

    @JsonBackReference
    @ManyToMany(mappedBy = "tags")
    private Set<ProductEntity> products;
}
