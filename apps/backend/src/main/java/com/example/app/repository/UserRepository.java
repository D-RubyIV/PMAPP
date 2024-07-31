package com.example.app.repository;

import com.example.app.common.Provider;
import com.example.app.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findByEmailAndProvider(String email, Provider provider);
    Optional<UserEntity> findByEmail(String username);
}
