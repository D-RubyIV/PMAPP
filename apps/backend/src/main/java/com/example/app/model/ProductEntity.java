package com.example.app.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name="products")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity extends BaseEntity{

    @NotBlank
    @NotNull
    private String name;

    @NotBlank
    @NotNull
    @Column(unique = true)
    private String code;

    @NotNull
    private float price;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;

    @JsonManagedReference
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tag_product",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<TagEntity> tags;

    @JsonManagedReference
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "product_collection",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "collection_id")
    )
    private Set<CollectionEntity> collections = new HashSet<>();;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private CategoryEntity category;

    @NotNull
    private Boolean suggest;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private MediaEntity media;
}
