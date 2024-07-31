package com.example.app.requests.order;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class OrderCheckoutRequests {
    @NotNull
    @NotBlank
    private String fullName;
    private String email;

    @NotNull
    @NotBlank
    private String phone;

    private Integer voucher;

    @NotNull
    @NotBlank
    private String address;

    private String note;

    @NotNull
    private Integer deliveryType;

    @NotNull
    private Integer paymentMethod;

    @NotNull
    @NotBlank
    private String tempAddressDetail;

}
