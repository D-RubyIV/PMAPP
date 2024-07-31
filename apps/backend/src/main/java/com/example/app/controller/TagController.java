package com.example.app.controller;

import com.example.app.model.CollectionEntity;
import com.example.app.model.TagEntity;
import com.example.app.repository.TagRepository;
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

@RequestMapping("api/manage/tags")
@RestController
public class TagController {
    @Autowired
    private TagRepository tagRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(tagRepository.findAll(pageable));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody TagEntity entity, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (tagRepository.findByCode(entity.getCode()).isPresent()) {
            throw new BadRequestException("Size entity already exists");
        }
        return ResponseEntity.ok(tagRepository.save(entity));
    }
    @PutMapping("{id}")
    public ResponseEntity<?> update(@Valid @RequestBody TagEntity entity, @PathVariable int id, BindingResult bindingResult) throws Exception {
        System.out.println("UPDATE");
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        TagEntity model = tagRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        BeanUtils.copyProperties(entity, model);
        return ResponseEntity.ok(tagRepository.save(model));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws Exception {
        TagEntity model = tagRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        tagRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
