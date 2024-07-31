package com.example.app.encode;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Arrays;

@Service
public class AESEncryption {
    private static final String ALGORITHM = "AES";

    @Value("${spring.app.sha.key}")
    private static final String secret_key = "";

    public static SecretKeySpec getKey() throws Exception {
        MessageDigest sha = MessageDigest.getInstance("SHA-256");
        byte[] key = secret_key.getBytes(StandardCharsets.UTF_8);
        key = sha.digest(key);
        key = Arrays.copyOf(key, 16); // Use only first 128 bit
        return new SecretKeySpec(key, ALGORITHM);
    }

    public static String encrypt(String data) throws Exception {
        SecretKeySpec secretKey = getKey();
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encryptedData = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encryptedData);
    }

    public static void main(String[] args) throws Exception {
        String data = "Hello, World!";
        String encryptedData = encrypt(data);
        System.out.println("Encrypted: " + encryptedData);
    }
}
