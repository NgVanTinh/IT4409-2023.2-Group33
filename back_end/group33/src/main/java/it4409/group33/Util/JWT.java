package it4409.group33.Util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class JWT {
    private static final String SECRET_KEY = "5a14345e0beabc059a0478ad735c40114d7eb8d96776c22b5538ed6a6a95a24b";
    private static final long EXPIRATION_TIME = 3600000;

    public static String createJWT(String userId, String userName, String role) {
        try {
            // Create Header
            String header = Base64.getUrlEncoder().withoutPadding()
                    .encodeToString("{\"alg\":\"HS256\",\"typ\":\"JWT\"}".getBytes());

            // Create Payload
            long currentTimeMillis = System.currentTimeMillis();
            long expirationMillis = currentTimeMillis + EXPIRATION_TIME;
            String payload = String.format("{\"userId\":\"%s\",\"userName\":\"%s\",\"role\":\"%s\",\"iat\":%d,\"exp\":%d}",
                    userId, userName, role, currentTimeMillis / 1000, expirationMillis / 1000);
            String base64Payload = Base64.getUrlEncoder().withoutPadding()
                    .encodeToString(payload.getBytes());

            // Create Signature
            String headerPayload = header + "." + base64Payload;
            Mac hmacSHA256 = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256");
            hmacSHA256.init(secretKey);
            String signature = Base64.getUrlEncoder().withoutPadding()
                    .encodeToString(hmacSHA256.doFinal(headerPayload.getBytes()));

            // Combine Header, Payload, and Signature
            return header + "." + base64Payload + "." + signature;
        } catch (Exception e) {
            throw new RuntimeException("Error while creating JWT", e);
        }
    }

    public static boolean validateJWT(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                return false;
            }

            String header = new String(Base64.getUrlDecoder().decode(parts[0]));
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
            String signature = parts[2];

            // Verify Signature
            String headerPayload = parts[0] + "." + parts[1];
            Mac hmacSHA256 = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256");
            hmacSHA256.init(secretKey);
            String calculatedSignature = Base64.getUrlEncoder().withoutPadding()
                    .encodeToString(hmacSHA256.doFinal(headerPayload.getBytes()));

            if (!calculatedSignature.equals(signature)) {
                return false;
            }

            // Parse Payload
            String[] payloadParts = payload.replace("{", "").replace("}", "").split(",");
            long exp = 0;
            for (String part : payloadParts) {
                String[] keyValue = part.split(":");
                if (keyValue[0].trim().replace("\"", "").equals("exp")) {
                    exp = Long.parseLong(keyValue[1].trim());
                }
            }

            // Check expiration
            long currentTimeMillis = System.currentTimeMillis() / 1000;
            if (currentTimeMillis > exp) {
                return false;
            }

            return true;
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
        // Assuming payload format: {"userId":"123","userName":"john_doe","role":"admin","iat":1622194531,"exp":1622198131}
        String[] parts = payload.split(",");
        for (String part : parts) {
            if (part.contains("\"userId\"")) {
                return part.split(":")[1].replaceAll("\"", "").trim();
            }
        }
        return null;
    }

    public static String getUserName(String token) {
        String payload = getPayload(token);
        String[] parts = payload.split(",");
        for (String part : parts) {
            if (part.contains("\"userName\"")) {
                return part.split(":")[1].replaceAll("\"", "").trim();
            }
        }
        return null;
    }

    public static String getRole(String token) {
        String payload = getPayload(token);
        String[] parts = payload.split(",");
        for (String part : parts) {
            if (part.contains("\"role\"")) {
                return part.split(":")[1].replaceAll("\"", "").trim();
            }
        }
        return null;
    }

}
