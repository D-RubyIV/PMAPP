package com.example.app.controller;

import com.amazonaws.services.kms.model.NotFoundException;
import com.example.app.model.ProductEntity;
import com.example.app.repository.CommentRepository;
import com.example.app.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/manage/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<?> getComments(){
        return ResponseEntity.ok(commentRepository.findAll());
    }

    @GetMapping("product/{id}")
    public ResponseEntity<?> getCommentsOfProduct(@PathVariable int id){
        ProductEntity productModel = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Not found product"));
        return ResponseEntity.ok(commentRepository.findAllByProduct(productModel));
    }
    

}
