package com.example.app.dto;

import com.example.app.common.Status;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDto {
    @NotNull
    private LocalDate orderDate;
    @NotNull
    private int user;
    @NotNull
    private int voucher;
    @NotNull
    private Status status;
}
