package com.example.app.util;

public class StringUtil {

    public static String capitalizeFirstLetterOfSentence(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }

    public static void main(String[] args) {
        String input = "đây là một chuỗi ví dụ.";
        String output = capitalizeFirstLetterOfSentence(input);
        System.out.println(output);  // Output: "Đây là một chuỗi ví dụ."
    }

}
