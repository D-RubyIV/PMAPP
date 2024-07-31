package com.example.app.model;

import com.example.app.common.Status;
import com.example.app.util.EnumPattern;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "orders")
public class OrderEntity extends BaseEntity {
    @NotNull
    private LocalDate orderDate;
    @NotNull
    private String address;
    private String note;
    @EnumPattern(name = "status", regexp = "Pending|Confirmed|Processing|Shipped|Delivered|Cancelled|Returned")
    private Status status;
    @EnumPattern(name = "payment_status", regexp = "Pending|Success")
    private Status paymentStatus;
    @ManyToOne
    @JoinColumn(name = "payment_id",referencedColumnName = "id")
    private PaymentEntity payment;
    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private UserEntity user;
    @ManyToOne
    @JoinColumn(name = "voucher_id", referencedColumnName = "id")
    private VoucherModel voucher;
}
