package com.example.app.repository;

import com.example.app.model.SizeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface SizeRepository extends JpaRepository<SizeEntity, Integer> {
    Optional<SizeEntity> findByNameOrCode(String name, String code);
    Optional<SizeEntity> findByCode(String name);
}
