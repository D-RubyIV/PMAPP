package com.example.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "cart_details")
public class CartDetailEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductDetailEntity productDetail;
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private CartEntity cart;
}
