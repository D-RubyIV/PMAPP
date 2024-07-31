package com.example.app.repository;

import com.example.app.model.CommentEntity;
import com.example.app.model.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    List<CommentEntity> findAllByProduct(ProductEntity productModel);
}
