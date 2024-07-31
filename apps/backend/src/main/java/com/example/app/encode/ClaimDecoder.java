package com.example.app.encode;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ClaimDecoder {

    public static Map<String, String> decodeClaims(String encodedClaims) {
        String decodedString = new String(Base64.getDecoder().decode(encodedClaims));
        String[] pairs = decodedString.split("&");
        Map<String, String> claims = new HashMap<>();
        for (String pair : pairs) {
            String[] keyValue = pair.split("=");
            if (keyValue.length == 2) {
                claims.put(keyValue[0], keyValue[1]);
            }
        }
        return claims;
    }

    public static void main(String[] args) {
        String encodedClaims = "dXNlcm5hbWU9am9obi1kb2U=role=admin"; // This is a Base64 encoded string
        Map<String, String> decodedClaims = decodeClaims(encodedClaims);
        System.out.println("Decoded Claims: " + decodedClaims);
    }
}
