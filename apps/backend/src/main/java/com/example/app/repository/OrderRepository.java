package com.example.app.repository;

import com.example.app.common.Status;
import com.example.app.model.OrderEntity;
import com.example.app.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
    List<OrderEntity> findAllByUser(UserEntity userModel);
    Optional<OrderEntity> findTopByUserAndStatusOrderByIdDesc(UserEntity userModel, Status status);
}
