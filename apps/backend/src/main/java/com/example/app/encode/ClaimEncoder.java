package com.example.app.encode;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

public class ClaimEncoder {

    public static String encodeClaims(Map<String, String> claims) {
        StringJoiner joiner = new StringJoiner("&");
        for (Map.Entry<String, String> entry : claims.entrySet()) {
            joiner.add(entry.getKey() + "=" + entry.getValue());
        }
        String plainText = joiner.toString();
        return Base64.getEncoder().encodeToString(plainText.getBytes());
    }

    public static void main(String[] args) {
        Map<String, String> claims = new HashMap<>();
        claims.put("username", "john_doe");
        claims.put("role", "admin");

        String encodedClaims = encodeClaims(claims);
        System.out.println("Encoded Claims: " + encodedClaims);
    }
}
