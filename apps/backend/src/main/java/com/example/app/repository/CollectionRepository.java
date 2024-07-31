package com.example.app.repository;

import com.example.app.model.CollectionEntity;
import com.example.app.model.ProductEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface CollectionRepository extends JpaRepository<CollectionEntity, Integer> {
    Optional<CollectionEntity> findByCode(String code);
}
