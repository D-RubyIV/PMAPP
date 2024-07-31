package com.example.app.response;

import com.example.app.model.CartDetailEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BillDecodeResponse {
    private double total;
    private String code;
    private List<CartDetailEntity> listCartDetails = new ArrayList<>();
}
