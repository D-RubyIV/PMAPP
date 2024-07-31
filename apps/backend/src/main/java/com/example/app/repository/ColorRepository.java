package com.example.app.repository;

import com.example.app.model.ColorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ColorRepository extends JpaRepository<ColorEntity, Integer> {
    Optional<ColorEntity> findByName(String name);
    Optional<ColorEntity> findByCode(String code);
    Optional<ColorEntity> findByNameOrCode(String name, String code);

}
