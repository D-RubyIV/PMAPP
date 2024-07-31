package com.example.app.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OverviewProductResponse {
    private int id;
    private String name;
    private float price;
    private String image;
    private double quantity;
    private double totalColor;
    private double totalSize;
}
