package com.example.app.repository;

import com.example.app.model.CartDetailEntity;
import com.example.app.model.CartEntity;
import com.example.app.model.ProductDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetailEntity, Integer> {
    List<CartDetailEntity> findAllByCart(CartEntity cartModel);
    Optional<CartDetailEntity> findByCartAndProductDetail(CartEntity cartModel, ProductDetailEntity productDetailModel);
}
