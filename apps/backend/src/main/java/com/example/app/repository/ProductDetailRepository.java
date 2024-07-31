package com.example.app.repository;

import com.example.app.model.ProductDetailEntity;
import com.example.app.model.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductDetailRepository extends JpaRepository<ProductDetailEntity, Integer> {
    ProductDetailEntity findByCode(String code);
    List<ProductDetailEntity> findAllByProduct(ProductEntity productModel);
    long countByQuantity(ProductDetailEntity entity);
}
