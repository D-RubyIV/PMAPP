package com.example.app.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartDetailDto {
    @NotNull
    private int productDetail;
    @NotNull
    private int quantity;
    @NotNull
    private int cart;
}
