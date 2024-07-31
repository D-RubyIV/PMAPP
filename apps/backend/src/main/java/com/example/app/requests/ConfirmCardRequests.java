package com.example.app.requests;

import com.example.app.model.CartDetailEntity;
import com.example.app.model.VoucherModel;
import com.example.app.requests.entity.CartQuantity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ConfirmCardRequests {
    private String voucherCode;
    private CartDetailEntity cartDetail;
}
