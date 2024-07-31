package com.example.app.service;

import com.example.app.model.CartEntity;
import com.example.app.model.UserEntity;
import com.example.app.repository.CartRepository;
import com.example.app.requests.ConfirmCardRequests;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public CartEntity findOrCreateCartByUser(UserEntity userModel) {
        Optional<CartEntity> cartOptional = cartRepository.findByUser(userModel);
        if (cartOptional.isPresent()) {
            return cartOptional.get();
        } else {
            CartEntity newCart = new CartEntity();
            newCart.setUser(userModel);
            return cartRepository.save(newCart);
        }
    }
}
