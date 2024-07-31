package com.example.app.service;

import com.example.app.common.Status;
import com.example.app.encode.ArrayEncoderDecoder;
import com.example.app.model.CartDetailEntity;
import com.example.app.model.OrderEntity;
import com.example.app.model.UserEntity;
import com.example.app.repository.CartDetailRepository;
import com.example.app.repository.OrderRepository;
import com.example.app.repository.PaymentRepository;
import com.example.app.repository.VoucherRepository;
import com.example.app.requests.order.OrderCheckoutRequests;
import com.example.app.response.BillDecodeResponse;
import com.example.app.response.BillEncodeResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private VoucherRepository voucherRepository;
    @Autowired
    private PaymentRepository paymentRepository;


    public BillEncodeResponse checkout(
            List<Integer> idCartDetails
    ) throws Exception {

        String encode = ArrayEncoderDecoder.encode(idCartDetails);
        System.out.println(encode);

        return BillEncodeResponse.builder().code(encode).build();
    }

    public BillDecodeResponse getDecodeCheckout(String code) throws Exception {
        System.out.println("CODE: " + code);
        List<Integer> ids = ArrayEncoderDecoder.decode(code);
        System.out.println(ids);

        double total = 0;
        List<CartDetailEntity> cartDetailEntityList = cartDetailRepository.findAllById(ids);
        for (CartDetailEntity s : cartDetailEntityList) {
            total += s.getProductDetail().getPrice() * s.getQuantity();
        }

        return BillDecodeResponse.builder().code(code).total(total).listCartDetails(cartDetailEntityList).build();
    }


    public OrderEntity orderOnline(
            OrderCheckoutRequests dto,
            UserEntity userEntity
    ) throws Exception {

        System.out.println(dto);


        OrderEntity orderEntity = new OrderEntity();
        if (dto.getVoucher() != null) {
            orderEntity.setVoucher(voucherRepository.findById(dto.getVoucher()).orElseThrow(() -> new BadRequestException("Not found Voucher")));
        }
        orderEntity.setPayment(paymentRepository.findById(dto.getPaymentMethod()).orElseThrow(() -> new BadRequestException("Not found Payment")));
        orderEntity.setPaymentStatus(Status.Pending);
        orderEntity.setNote(dto.getNote());
        orderEntity.setUser(userEntity);
        orderEntity.setAddress(dto.getAddress());
        orderEntity.setNote(dto.getNote());
        orderEntity.setStatus(Status.Pending);
        orderEntity.setOrderDate(LocalDate.now());

        return orderRepository.save(orderEntity);
    }
}
