package com.rc.dailylog2.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class Sha256Util {

    public static String encrypt(String text){
        try
        {
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update(text.getBytes(StandardCharsets.UTF_8));
            byte[] bytes = messageDigest.digest();

            StringBuilder builder = new StringBuilder();
            for (byte b: bytes) {
                builder.append(String.format("%02x", b));
            }
            return builder.toString();

        }catch (Exception exception){
            throw new RuntimeException(exception);
        }
    }
}
