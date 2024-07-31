package com.example.app.controller;

import com.example.app.model.ProductEntity;
import com.example.app.repository.ProductRepository;
import com.example.app.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@Slf4j
@AutoConfigureMockMvc
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductRepository productRepository;

    @MockBean
    private ProductService productService;

    private ProductEntity expected;
    private ProductEntity input;

    // Chạy trước mỗi case
    @BeforeEach
    public void initData(){
        expected = ProductEntity.builder()
                .name("Product 1")
                .code("PD01")
                .price(100)
                .description("abcd").build();

        input = ProductEntity.builder()
                .name("Product 1")
                .code("PD01")
                .price(100)
                .description("abcd").build();
    }

    @Test
    public void testCreate() throws Exception {
        log.info("Hello Test");
        // GIVEN
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(input);


        // WHEN
        mockMvc.perform(MockMvcRequestBuilders
                .post("api/manage/products")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("code").value(1000));
        // THEN
    }

    @Test
    public void testCase2(){
        Pageable pageable = PageRequest.of(0, 5);
        System.out.println(productRepository.findBySuggestTrue(pageable));
    }
}
