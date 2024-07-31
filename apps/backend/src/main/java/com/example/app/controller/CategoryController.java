package com.example.app.controller;

import com.example.app.model.CategoryEntity;
import com.example.app.repository.CategoryRepository;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/manage/categories")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(categoryRepository.findAll(pageable));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody CategoryEntity entity, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (categoryRepository.findByName(entity.getName()) != null) {
            throw new BadRequestException("product name already exists");
        }
        return ResponseEntity.ok(categoryRepository.save(entity));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@Valid @RequestBody CategoryEntity entity, @PathVariable int id, BindingResult bindingResult) throws Exception {
        System.out.println("UPDATE");
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        CategoryEntity model = categoryRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        BeanUtils.copyProperties(entity, model);
        return ResponseEntity.ok(categoryRepository.save(model));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws Exception {
        CategoryEntity model = categoryRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        categoryRepository.delete(model);
        return ResponseEntity.ok("");
    }


}
