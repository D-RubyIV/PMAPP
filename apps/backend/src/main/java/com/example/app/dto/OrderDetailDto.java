package com.example.app.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDetailDto {
    @NotNull
    private int order;
    @NotNull
    private int productDetail;
    @NotNull
    @Min(1)
    private int quantity;
}
