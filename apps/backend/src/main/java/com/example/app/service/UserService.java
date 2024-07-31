package com.example.app.service;

import com.example.app.model.UserEntity;
import com.example.app.repository.UserRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserEntity save(UserEntity entity) throws BadRequestException {
        entity.setEnabled(true);
        userRepository.save(entity);
        return entity;
    }

    public UserEntity update(Long id, UserEntity entity) throws BadRequestException {
        userRepository.save(entity);
        return entity;
    }

}
