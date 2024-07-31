package com.example.app.controller;

import com.example.app.dto.OrderDetailDto;
import com.example.app.model.OrderDetailEntity;
import com.example.app.model.OrderEntity;
import com.example.app.model.UserEntity;
import com.example.app.repository.OrderDetailRepository;
import com.example.app.repository.OrderRepository;
import com.example.app.repository.ProductDetailRepository;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("api/manage/order-details")
public class OrderDetailController {
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(orderDetailRepository.findAll(pageable));
    }

    @GetMapping("me")
    public ResponseEntity<?> getMyOrder(Authentication authentication) {
        System.out.println(authentication);
        UserEntity userModel = (UserEntity) authentication.getPrincipal();
        return ResponseEntity.ok(userModel);
    }

    @GetMapping("of/{id}")
    public ResponseEntity<?> detail(@PathVariable int id) {
        OrderEntity orderModel = orderRepository.findById(id).orElse(null);
        List<OrderDetailEntity> list = new ArrayList<>();
        if (orderModel != null) {
            list = orderDetailRepository.findByOrder(orderModel);
        }
        return ResponseEntity.ok(list);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody OrderDetailDto dto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        OrderDetailEntity entity = new OrderDetailEntity();
        BeanUtils.copyProperties(dto, entity);
        entity.setOrder(orderRepository.findById(dto.getOrder()).orElseThrow(() -> new BadRequestException("Order not found")));
        entity.setProductDetail(productDetailRepository.findById(dto.getProductDetail()).orElseThrow(() -> new BadRequestException("Product detail not found")));
        return ResponseEntity.ok(orderDetailRepository.save(entity));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@Valid @RequestBody OrderDetailDto entity, @PathVariable int id, BindingResult bindingResult) throws Exception {
        System.out.println("UPDATE");
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        OrderDetailEntity model = orderDetailRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        BeanUtils.copyProperties(entity, model);
        return ResponseEntity.ok(orderDetailRepository.save(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws Exception {
        OrderDetailEntity model = orderDetailRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        orderDetailRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
