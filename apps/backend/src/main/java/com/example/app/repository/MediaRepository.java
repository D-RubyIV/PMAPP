package com.example.app.repository;

import com.example.app.model.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MediaRepository extends JpaRepository<MediaEntity, Integer> {
    Optional<MediaEntity> findByName(String name);

}
