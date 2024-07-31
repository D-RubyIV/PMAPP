package com.example.app.service;

import com.example.app.model.UserEntity;
import com.example.app.repository.UserRepository;
import com.example.app.requests.SignUpRequests;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public UserEntity register(SignUpRequests signUpRequests){
        UserEntity userModel = new UserEntity();
        userModel.setEmail(signUpRequests.getEmail());
        userModel.setPassword(signUpRequests.getPassword());
        userModel.setEnabled(true);
        userRepository.save(userModel);
        return userModel;
    }
}
