package com.example.app.controller;

import com.example.app.dto.CartDetailDto;
import com.example.app.model.CartDetailEntity;
import com.example.app.model.CartEntity;
import com.example.app.model.ProductDetailEntity;
import com.example.app.repository.CartDetailRepository;
import com.example.app.repository.CartRepository;
import com.example.app.repository.ProductDetailRepository;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/manage/cart-details")
@RestController
public class CartDetailController {

    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;

    @PostMapping("")
    public ResponseEntity<?> create(
            @Valid @RequestBody CartDetailDto dto, BindingResult bindingResult
    ) throws BindException, BadRequestException {
        // Validate
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        ProductDetailEntity productDetail = productDetailRepository.findById(dto.getProductDetail())
                .orElseThrow(() -> new BadRequestException("Product detail not found"));
        CartEntity cart = cartRepository.findById(dto.getCart())
                .orElseThrow(() -> new BadRequestException("Cart not found"));

        CartDetailEntity cartDetail = cartDetailRepository.findByCartAndProductDetail(cart, productDetail)
                .map(existingCartDetail -> {
                    existingCartDetail.setQuantity(existingCartDetail.getQuantity() + dto.getQuantity());
                    return existingCartDetail;
                })
                .orElseGet(() -> {
                    CartDetailEntity newCartDetail = new CartDetailEntity();
                    newCartDetail.setQuantity(dto.getQuantity());
                    newCartDetail.setProductDetail(productDetail);
                    newCartDetail.setCart(cart);
                    return newCartDetail;
                });

        CartDetailEntity savedCartDetail = cartDetailRepository.save(cartDetail);
        return ResponseEntity.ok(savedCartDetail);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        cartDetailRepository.deleteById(id);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("increase/{id}")
    public ResponseEntity<CartDetailEntity> increase(@PathVariable int id) throws BadRequestException {
        CartDetailEntity entity = cartDetailRepository.findById(id).orElseThrow(() -> new BadRequestException("Cart not found"));
        if (entity.getQuantity() + 1 <= entity.getProductDetail().getQuantity()){
            entity.setQuantity(entity.getQuantity() + 1);
            cartDetailRepository.save(entity);
        }
        return ResponseEntity.ok(entity);
    }

    @GetMapping("decrease/{id}")
    public ResponseEntity<CartDetailEntity> decrease(@PathVariable int id) throws BadRequestException {
        CartDetailEntity entity = cartDetailRepository.findById(id).orElseThrow(() -> new BadRequestException("Cart not found"));
        if (entity.getQuantity() - 1 > 0){
            entity.setQuantity(entity.getQuantity() - 1);
            cartDetailRepository.save(entity);
        }
        else{
            cartDetailRepository.deleteById(id);
        }
        return ResponseEntity.ok(entity);
    }
}
