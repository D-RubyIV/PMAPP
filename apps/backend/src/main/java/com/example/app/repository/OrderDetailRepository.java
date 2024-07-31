package com.example.app.repository;

import com.example.app.model.OrderDetailEntity;
import com.example.app.model.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Integer> {
    List<OrderDetailEntity> findByOrder(OrderEntity orderModel);
}
