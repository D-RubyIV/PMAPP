package com.example.app.controller;

import com.example.app.model.ColorEntity;
import com.example.app.repository.ColorRepository;
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

@RequestMapping("api/manage/colors")
@RestController
public class ColorController {
    @Autowired
    private ColorRepository colorRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(colorRepository.findAll(pageable));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody ColorEntity entity, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (colorRepository.findByNameOrCode(entity.getName(), entity.getCode()) != null) {
            throw new BadRequestException("product name already exists");
        }
        return ResponseEntity.ok(colorRepository.save(entity));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@Valid @RequestBody ColorEntity entity, @PathVariable int id, BindingResult bindingResult) throws Exception {
        System.out.println("UPDATE");
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        ColorEntity model = colorRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        BeanUtils.copyProperties(entity, model);
        return ResponseEntity.ok(colorRepository.save(model));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws Exception {
        ColorEntity model = colorRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        colorRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
