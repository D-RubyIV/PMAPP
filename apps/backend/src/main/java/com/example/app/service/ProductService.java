package com.example.app.service;

import com.example.app.model.CollectionEntity;
import com.example.app.model.ProductDetailEntity;
import com.example.app.model.ProductEntity;
import com.example.app.repository.CollectionRepository;
import com.example.app.repository.ProductDetailRepository;
import com.example.app.repository.ProductRepository;
import com.example.app.response.OverviewProductResponseV3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    public Page<ProductEntity> findByCollections(String code, Pageable pageable) {
        return productRepository.findByCollections_Code(code, pageable);
    }

    public long countByCollections(String code) {
        return productRepository.countByCollections_Code(code);
    }
}