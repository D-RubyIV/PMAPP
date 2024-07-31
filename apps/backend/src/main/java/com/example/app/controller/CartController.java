package com.example.app.controller;

import com.example.app.model.CartEntity;
import com.example.app.model.UserEntity;
import com.example.app.repository.CartRepository;
import com.example.app.requests.ConfirmCardRequests;
import com.example.app.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/manage/carts")
@RestController
public class CartController {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartService cartService;

    @GetMapping("me")
    public ResponseEntity<CartEntity> handleCart(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);

        if (authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)){
            UserEntity currentUser = (UserEntity) authentication.getPrincipal();
            return ResponseEntity.ok(cartRepository.findByUser(currentUser).orElse(null));
        } else {
            return ResponseEntity.ok(null);
        }
    }


}
