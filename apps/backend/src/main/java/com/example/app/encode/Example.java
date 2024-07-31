package com.example.app.encode;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

public class Example {
    public static void main(String[] args) {
        // Tạo danh sách các đối tượng có khóa
        Map<String, Integer> map = new HashMap<>();
        map.put("first", 1);
        map.put("second", 2);

        // Mã hóa (Encode) danh sách thành chuỗi JSON
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String jsonString = objectMapper.writeValueAsString(map);
            System.out.println("Encoded JSON: " + jsonString);

            // Giải mã (Decode) chuỗi JSON về danh sách
            Map<String, Integer> decodedMap = objectMapper.readValue(jsonString, Map.class);
            System.out.println("Decoded Map: " + decodedMap);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
