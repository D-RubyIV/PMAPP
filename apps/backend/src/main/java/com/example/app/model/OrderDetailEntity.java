package com.example.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "order_details")
public class OrderDetailEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private OrderEntity order;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private ProductDetailEntity productDetail;
    @NotNull
    private int quantity;
}
