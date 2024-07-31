package com.example.app.encode;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;


public class ArrayEncoderDecoder {
    @Value("${spring.app.sha.key}")
    private static final String secret_key = "";

    public static void main(String[] args) throws Exception {
        List<Integer> list = List.of(1, 2);

        // Mã hóa danh sách thành chuỗi
        String encodedString = encode(list);
        System.out.println("Chuỗi đã mã hóa: " + encodedString);

        // Giải mã chuỗi về danh sách
        List<Integer> decodedList = decode(encodedString);
        System.out.println("Danh sách đã giải mã:");
        for (int num : decodedList) {
            System.out.print(num + " ");
        }
    }

    // Phương thức chuyển chuỗi thành SecretKey
    public static SecretKey createSecretKeyFromString(String keyString) throws Exception {
        MessageDigest sha = MessageDigest.getInstance("SHA-256");
        byte[] key = sha.digest(keyString.getBytes(StandardCharsets.UTF_8));
        return new SecretKeySpec(key, "AES");
    }

    // Phương thức mã hóa
    public static String encode(List<Integer> list) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, createSecretKeyFromString(secret_key));

        // Chuyển đổi danh sách số nguyên thành byte array
        byte[] byteArray = new byte[list.size() * Integer.BYTES];
        for (int i = 0; i < list.size(); i++) {
            int value = list.get(i);
            for (int j = 0; j < Integer.BYTES; j++) {
                byteArray[i * Integer.BYTES + j] = (byte) (value >> (j * 8));
            }
        }

        // Mã hóa byte array
        byte[] encryptedBytes = cipher.doFinal(byteArray);
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    // Phương thức giải mã
    public static List<Integer> decode(String encodedString) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, createSecretKeyFromString(secret_key));

        // Chuyển đổi chuỗi base64 thành byte array
        byte[] encryptedBytes = Base64.getDecoder().decode(encodedString);

        // Giải mã byte array
        byte[] byteArray = cipher.doFinal(encryptedBytes);
        Integer[] result = new Integer[byteArray.length / Integer.BYTES];
        for (int i = 0; i < result.length; i++) {
            int value = 0;
            for (int j = 0; j < Integer.BYTES; j++) {
                value |= (byteArray[i * Integer.BYTES + j] & 0xFF) << (j * 8);
            }
            result[i] = value;
        }
        return List.of(result);
    }
}
