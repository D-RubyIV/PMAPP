package com.example.app.response;

import com.example.app.model.ProductEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProductPageResponse {
    private Page<ProductEntity> products;
    private long totalProducts;
}
