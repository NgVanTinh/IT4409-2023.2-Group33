package it4409.group33.Function;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class GenToken {
    private static final String SECRET_KEY = "5a14345e0beabc059a0478ad735c40114d7eb8d96776c22b5538ed6a6a95a24b";
    public static String genToken(String username, String password) {
        return username + "." +  password;
    }

    public static String decodeBase64(String base64String) {
        byte[] decodedBytes = Base64.getDecoder().decode(base64String);
        return new String(decodedBytes);
    }

    public static String encodeToBase64(String normalString) {
        byte[] bytesToEncode = normalString.getBytes();
        return Base64.getEncoder().encodeToString(bytesToEncode);
    }

    public static String encodeHS256(String data) {
        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256");
            sha256_HMAC.init(secretKeySpec);
            byte[] hmacBytes = sha256_HMAC.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(hmacBytes);
        } catch (Exception e) {
            throw new RuntimeException("Failed to calculate HMAC SHA-256", e);
        }
    }

    public static boolean verifyHS256(String data, String providedHmac) {
        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256");
            sha256_HMAC.init(secretKeySpec);
            byte[] hmacBytes = sha256_HMAC.doFinal(data.getBytes());
            String computedHmac = Base64.getEncoder().encodeToString(hmacBytes);
            return computedHmac.equals(providedHmac);
        } catch (Exception e) {
            throw new RuntimeException("Failed to verify HMAC SHA-256", e);
        }
    }

}
