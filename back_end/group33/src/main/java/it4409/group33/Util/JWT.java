package it4409.group33.Util;

import it4409.group33.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Objects;

@Component
public class JWT {
    @Autowired
    public UserService userService;
    private static final String SECRET_KEY = "5a14345e0beabc059a0478ad735c40114d7eb8d96776c22b5538ed6a6a95a24b";
    private static final long EXPIRATION_TIME = 360000000;

    public static String createJWT(String userId, String userName, String role) {
        try {
            String header = Base64.getUrlEncoder().withoutPadding()
                    .encodeToString("{\"alg\":\"HS256\",\"typ\":\"JWT\"}".getBytes());

            long currentTimeMillis = System.currentTimeMillis();
            long expirationMillis = currentTimeMillis + EXPIRATION_TIME;
            String payload = String.format("{\"userId\":\"%s\",\"userName\":\"%s\",\"role\":\"%s\",\"iat\":%d,\"exp\":%d}",
                    userId, userName, role, currentTimeMillis / 1000, expirationMillis / 1000);
            String base64Payload = Base64.getUrlEncoder().withoutPadding()
                    .encodeToString(payload.getBytes());

            String headerPayload = header + "." + base64Payload;
            Mac hmacSHA256 = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256");
            hmacSHA256.init(secretKey);
            String signature = Base64.getUrlEncoder().withoutPadding()
                    .encodeToString(hmacSHA256.doFinal(headerPayload.getBytes()));

            return header + "." + base64Payload + "." + signature;
        } catch (Exception e) {
            throw new RuntimeException("Error while creating JWT", e);
        }
    }

    public boolean validateJWT(String token) {
        Long id = Long.valueOf(getUserId(token));
        if(!userService.isActived(id)) {
            return false;
        }
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                return false;
            }
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
            String signature = parts[2];
            String headerPayload = parts[0] + "." + parts[1];
            Mac hmacSHA256 = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256");
            hmacSHA256.init(secretKey);
            String calculatedSignature = Base64.getUrlEncoder().withoutPadding()
                    .encodeToString(hmacSHA256.doFinal(headerPayload.getBytes()));
            if (!calculatedSignature.equals(signature)) {
                return false;
            }
            String[] payloadParts = payload.replace("{", "").replace("}", "").split(",");
            long exp = 0;
            for (String part : payloadParts) {
                String[] keyValue = part.split(":");
                if (keyValue[0].trim().replace("\"", "").equals("exp")) {
                    exp = Long.parseLong(keyValue[1].trim());
                }
            }
            long currentTimeMillis = System.currentTimeMillis() / 1000;
            return currentTimeMillis <= exp;
        } catch (Exception e) {
            return false;
        }
    }

    public static String getPayload(String token) {
        String[] parts = token.split("\\.");
        if (parts.length != 3) {
            return null;
        }
        return new String(Base64.getUrlDecoder().decode(parts[1]));
    }

    public static String getUserId(String token) {
        String payload = getPayload(token);
        assert payload != null;
        String[] parts = payload.split(",");
        for (String part : parts) {
            if (part.contains("\"userId\"")) {
                return part.split(":")[1].replaceAll("\"", "").trim();
            }
        }
        return null;
    }

    public static String getRole(String token) {
        String payload = getPayload(token);
        assert payload != null;
        String[] parts = payload.split(",");
        for (String part : parts) {
            if (part.contains("\"role\"")) {
                return part.split(":")[1].replaceAll("\"", "").trim();
            }
        }
        return null;
    }

    public static boolean isUserOrAdmin(String token) {
        return Objects.requireNonNull(getRole(token)).equals("admin") || Objects.requireNonNull(getRole(token)).equals("user");
    }

    public static boolean isUser(String token) {
        return Objects.requireNonNull(getRole(token)).equals("user");
    }

    public static boolean isAdmin(String token) {
        return Objects.requireNonNull(getRole(token)).equals("admin");
    }

}
