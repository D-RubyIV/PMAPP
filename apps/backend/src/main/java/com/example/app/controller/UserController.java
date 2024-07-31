package com.example.app.controller;

import com.example.app.common.Provider;
import com.example.app.model.UserEntity;
import com.example.app.repository.UserRepository;
import com.example.app.service.UserService;
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
@RequestMapping("api/manage/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<?> findAll(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "1") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(userRepository.findAll(pageable));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody UserEntity entity, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (userRepository.findByEmailAndProvider(entity.getEmail(), Provider.Local) != null) {
            throw new BadRequestException("user already exists");
        }
        return ResponseEntity.ok(userService.save(entity));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@Valid @RequestBody UserEntity entity, @PathVariable int id, BindingResult bindingResult) throws Exception {
        System.out.println("UPDATE");
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        UserEntity model = userRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        BeanUtils.copyProperties(entity, model);
        return ResponseEntity.ok(userRepository.save(model));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws Exception {
        UserEntity model = userRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        userRepository.delete(model);
        return ResponseEntity.ok("");
    }

}
