package com.example.app.repository;

import com.example.app.model.MessageEntity;
import com.example.app.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<MessageEntity, Integer> {
    List<MessageEntity> findAllByUser(UserEntity user);
}
