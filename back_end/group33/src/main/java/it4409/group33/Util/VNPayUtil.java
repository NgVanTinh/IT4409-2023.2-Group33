package it4409.group33.Util;

import jakarta.servlet.http.HttpServletRequest;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

public class VNPayUtil {

    public static String hmacSHA512(final String key, final String data) {
        try {
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes(StandardCharsets.UTF_8);
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();
        } catch (Exception ex) {
            return "";
        }
    }

    public static String getIpAddress(HttpServletRequest request) {
        String ipAdress;
        try {
            ipAdress = request.getHeader("X-FORWARDED-FOR");
            if (ipAdress == null) {
                ipAdress = request.getRemoteAddr();
            }
        } catch (Exception e) {
            ipAdress = "Invalid IP:" + e.getMessage();
        }
        return ipAdress;
    }

    public static String getRandomNumber(int len) {
        Random rnd = new Random();
        String chars = "0123456789";
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }

    public static String getPaymentURL(Map<String, String> paramsMap, String secretKey) {
        try {
            // Sắp xếp các tham số theo thứ tự từ điển
            String sortedParams = paramsMap.entrySet().stream()
                    .filter(entry -> entry.getValue() != null && !entry.getValue().isEmpty())
                    .sorted(Map.Entry.comparingByKey())
                    .map(entry -> entry.getKey() + "=" + entry.getValue())
                    .collect(Collectors.joining("&"));

            // Tạo chữ ký HMAC-SHA512
            String secureHash = hmacSHA512(secretKey, sortedParams);

            // Thêm chữ ký vào danh sách các tham số
            paramsMap.put("vnp_SecureHash", secureHash);

            // Tạo URL thanh toán từ danh sách các tham số đã có chữ ký
            String paymentUrl = paramsMap.entrySet().stream()
                    .map(entry ->
                            URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8) + "=" +
                                    URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8))
                    .collect(Collectors.joining("&"));

            return paymentUrl;
        } catch (Exception ex) {
            return "";
        }
    }
}
