package com.example.app.controller;

import com.example.app.dto.ProductDetailDto;
import com.example.app.model.MediaEntity;
import com.example.app.model.ProductDetailEntity;
import com.example.app.model.ProductEntity;
import com.example.app.repository.*;
import com.example.app.service.CloudService;
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

import java.util.List;
import java.util.UUID;

@RequestMapping("api/manage/product-details")
@RestController
public class ProductDetailController {
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private MediaRepository mediaRepository;
    @Autowired
    private CloudService cloudService;

    @GetMapping("")
    public ResponseEntity<?> findAll(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(productDetailRepository.findAll(pageable));
    }

    @GetMapping("product/{idProduct}")
    public ResponseEntity<?> findAllByProduct(@PathVariable int idProduct) throws BadRequestException {
        ProductEntity productModel = productRepository.findById(idProduct).orElseThrow(()->new BadRequestException("Product not found"));
        List<ProductDetailEntity> productDetailModels = productDetailRepository.findAllByProduct(productModel);
        return ResponseEntity.ok(productDetailModels);
    }

    @PostMapping(value = "", consumes = "multipart/form-data")
    public ResponseEntity<?> add(@Valid @ModelAttribute ProductDetailDto dto, BindingResult bindingResult) throws Exception {
        MediaEntity mediaModel = new MediaEntity();
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (productDetailRepository.findByCode(dto.getCode()) != null) {
            throw new BadRequestException("Product detail name already exists");
        }
        ProductDetailEntity model = new ProductDetailEntity();
        BeanUtils.copyProperties(dto, model);
        model.setProduct(productRepository.findById(dto.getProduct()).orElseThrow(() -> new BadRequestException("Product not found")));
        model.setColor(colorRepository.findById(dto.getColor()).orElseThrow(() -> new BadRequestException("Color not found")));
        model.setSize(sizeRepository.findById(dto.getSize()).orElseThrow(() -> new BadRequestException("Size not found")));
        return uploadAndSaveMedia(dto, mediaModel, model);
    }

    @PutMapping(value = "{id}", consumes = "multipart/form-data")
    public ResponseEntity<?> update(@Valid @ModelAttribute ProductDetailDto dto, @PathVariable int id, BindingResult bindingResult) throws Exception {
        MediaEntity mediaModel = new MediaEntity();
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (productDetailRepository.findByCode(dto.getCode()) == null) {
            throw new BadRequestException("Product detail code already not exists");
        }
        ProductDetailEntity model = productDetailRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        BeanUtils.copyProperties(dto, model);
        model.setProduct(productRepository.findById(dto.getProduct()).orElseThrow(() -> new BadRequestException("Product not found")));
        model.setColor(colorRepository.findById(dto.getColor()).orElseThrow(() -> new BadRequestException("Color not found")));
        model.setSize(sizeRepository.findById(dto.getSize()).orElseThrow(() -> new BadRequestException("Size not found")));
        return uploadAndSaveMedia(dto, mediaModel, model);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws Exception {
        ProductDetailEntity model = productDetailRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        productDetailRepository.delete(model);
        return ResponseEntity.ok("");
    }

    private ResponseEntity<?> uploadAndSaveMedia(@ModelAttribute @Valid ProductDetailDto dto, MediaEntity mediaModel, ProductDetailEntity model) {
        BeanUtils.copyProperties(dto, model);
        if (dto.getFile() != null){
            String fileName = UUID.randomUUID().toString();
            mediaModel.setName(fileName);
            mediaRepository.save(mediaModel);
            cloudService.uploadFile(dto.getFile(), fileName);
            model.setMedia(mediaModel);
        }
        return ResponseEntity.ok(productDetailRepository.save(model));
    }

}
