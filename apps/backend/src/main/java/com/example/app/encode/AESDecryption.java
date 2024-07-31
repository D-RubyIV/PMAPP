package com.example.app.encode;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class AESDecryption {
    private static final String ALGORITHM = "AES";

    public static String decrypt(String encryptedData) throws Exception {
        SecretKeySpec secretKey = AESEncryption.getKey();
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decodedData = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedData = cipher.doFinal(decodedData);
        return new String(decryptedData, StandardCharsets.UTF_8);
    }

    public static void main(String[] args) throws Exception {
        String encryptedData = "rADbb87fhJuc6x+PlsuuWw=="; // Replace with actual encrypted data
        String decryptedData = decrypt(encryptedData);
        System.out.println("Decrypted: " + decryptedData);
    }
}
