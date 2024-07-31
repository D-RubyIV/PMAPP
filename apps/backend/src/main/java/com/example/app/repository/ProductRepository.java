package com.example.app.repository;

import com.example.app.model.ProductEntity;
import com.example.app.response.OverviewProductResponse;
import com.example.app.response.OverviewProductResponseV3;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    ProductEntity findByName(String name);
    Page<ProductEntity> findBySuggestTrue(Pageable pageable);

    @Query(value = "select new com.example.app.response.OverviewProductResponseV3(p, count(pd.size), count(pd.color), count(pd.quantity)) from ProductEntity p left join ProductDetailEntity pd on pd.product.id = p.id group by p.id")
    Page<OverviewProductResponseV3> findOverviewV3(Pageable pageable);

    @Query(value = "select new com.example.app.response.OverviewProductResponseV3(p, count(pd.size), count(pd.color), count(pd.quantity)) " +
            "from ProductEntity p " +
            "left join ProductDetailEntity pd on pd.product.id = p.id " +
            "left join p.collections c " +
            "where c.code = :code " +
            "group by p.id")
    Page<OverviewProductResponseV3> findAllOverViewProductV4(Pageable pageable, @Param(value = "code") String code);

    Page<ProductEntity> findByCollections_Code(String code, Pageable pageable);
    long countByCollections_Code(String code);
}
