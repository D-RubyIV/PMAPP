package com.example.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "product_details")
public class ProductDetailEntity extends BaseEntity {
    private String name;
    private String code;
    private float price;
    private int quantity;
    @OneToOne
    @JoinColumn(name = "media_id", referencedColumnName = "id")
    private MediaEntity media;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private ProductEntity product;
    @ManyToOne
    @JoinColumn(name = "color_id", referencedColumnName = "id")
    private ColorEntity color;
    @ManyToOne
    @JoinColumn(name = "size_id", referencedColumnName = "id")
    private SizeEntity size;
}
