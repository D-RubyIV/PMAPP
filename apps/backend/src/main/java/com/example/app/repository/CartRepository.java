package com.example.app.repository;

import com.example.app.model.CartEntity;
import com.example.app.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CartRepository extends JpaRepository<CartEntity, Integer> {
    Optional<CartEntity> findByUser(UserEntity userModel);
}
