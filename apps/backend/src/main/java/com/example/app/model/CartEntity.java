package com.example.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "carts")
public class CartEntity extends BaseEntity {
    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
