package com.example.app.controller;

import com.example.app.model.VoucherModel;
import com.example.app.repository.VoucherRepository;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/manage/vouchers")
public class VoucherController {
    @Autowired
    private VoucherRepository voucherRepository;

    @GetMapping("")
    public ResponseEntity<?> findAllByPage(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(voucherRepository.findAll(pageable));
    }

    @GetMapping("{code}")
    public ResponseEntity<?> findOne(@PathVariable String code) throws BadRequestException {
        return ResponseEntity.ok(voucherRepository.findByCode(code).orElseThrow(()-> new BadRequestException("Mã giảm giá không tồn tại")));
    }


    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody VoucherModel entity, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (voucherRepository.findByNameOrCode(entity.getName(), entity.getCode()).isPresent()) {
            throw new BadRequestException("product name already exists");
        }

        return ResponseEntity.ok(voucherRepository.save(entity));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@Valid @RequestBody VoucherModel entity, @PathVariable int id, BindingResult bindingResult) throws Exception {
        System.out.println("UPDATE");
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        VoucherModel model = voucherRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        BeanUtils.copyProperties(entity, model);
        return ResponseEntity.ok(voucherRepository.save(model));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws Exception {
        VoucherModel model = voucherRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        voucherRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
