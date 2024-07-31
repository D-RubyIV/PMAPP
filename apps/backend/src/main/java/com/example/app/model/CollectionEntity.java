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
@Table(name = "collections")
public class CollectionEntity extends BaseEntity{

    @NotBlank
    @NotNull
    private String name;

    @NotBlank
    @NotNull
    private String code;

    @JsonIgnore
    @JsonBackReference
    @ManyToMany(mappedBy = "collections", fetch = FetchType.EAGER)
    private Set<ProductEntity> productSet = new HashSet<>();
}