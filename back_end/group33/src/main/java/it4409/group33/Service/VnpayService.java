package it4409.group33.Service;

import it4409.group33.Config.VnpayConfig;
import it4409.group33.Model.Order;
import it4409.group33.Repository.OrderRepository;
import it4409.group33.Util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import static it4409.group33.Util.VNPayUtil.getIpAddress;

@Service
public class VnpayService {

    @Autowired
    private VnpayConfig vnpayConfig;

    @Autowired
    private OrderRepository orderRepository;

    public String createPaymentUrl(Order order, HttpServletRequest request) {
        try {
            String vnp_Version = "2.1.0";
            String vnp_Command = "pay";
            String vnp_TxnRef = VNPayUtil.getRandomNumber(8);
            String vnp_IpAddr = getIpAddress(request);

            String returnURL = vnpayConfig.getVnpReturnUrl();

            long amount = (long) (order.getDiscountedPrice() * 100); // Amount in VND * 100
            Map<String, String> vnp_Params = new HashMap<>();
            vnp_Params.put("vnp_Version", vnp_Version);
            vnp_Params.put("vnp_Command", vnp_Command);
            vnp_Params.put("vnp_TmnCode", vnpayConfig.getVnpTmnCode());
            vnp_Params.put("vnp_Amount", String.valueOf(amount));
            vnp_Params.put("vnp_CurrCode", "VND");
            vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
            vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang: " + order.getId());
            vnp_Params.put("vnp_OrderType", "other");
            vnp_Params.put("vnp_Locale", "vn");
            vnp_Params.put("vnp_ReturnUrl", returnURL);
            vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

            Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
            String vnp_CreateDate = formatter.format(cld.getTime());
            vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
            cld.add(Calendar.MINUTE, 435);
            String vnp_ExpireDate = formatter.format(cld.getTime());
            vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

            // Build data to hash and querystring
            List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            StringBuilder query = new StringBuilder();
            Iterator<String> itr = fieldNames.iterator();
            while (itr.hasNext()) {
                String fieldName = itr.next();
                String fieldValue = vnp_Params.get(fieldName);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    // Build hash data
                    hashData.append(fieldName);
                    hashData.append('=');
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                    // Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                    if (itr.hasNext()) {
                        query.append('&');
                        hashData.append('&');
                    }
                }
            }
            String queryUrl = query.toString();
            String vnp_SecureHash = VNPayUtil.hmacSHA512(vnpayConfig.getVnpHashSecret(), hashData.toString());
            queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
            String paymentUrl = vnpayConfig.getVnpUrl() + "?" + queryUrl;

            JSONObject res = order.toJson();
            res.put("payURL",paymentUrl);
            return res.toString();

        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public String createPaymentUrlX(Order order, HttpServletRequest request) {
        try {
            String vnp_Version = "2.1.0";
            String vnp_Command = "pay";
            String vnp_TxnRef = VNPayUtil.getRandomNumber(8);
            String vnp_IpAddr = getIpAddress(request);

            String returnURL = vnpayConfig.getVnpReturnUrl();

            long amount = (long) (order.getDiscountedPrice() * 100); // Amount in VND * 100
            Map<String, String> vnp_Params = new HashMap<>();
            vnp_Params.put("vnp_Version", vnp_Version);
            vnp_Params.put("vnp_Command", vnp_Command);
            vnp_Params.put("vnp_TmnCode", vnpayConfig.getVnpTmnCode());
            vnp_Params.put("vnp_Amount", String.valueOf(amount));
            vnp_Params.put("vnp_CurrCode", "VND");
            vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
            vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang: " + order.getId());
            vnp_Params.put("vnp_OrderType", "other");
            vnp_Params.put("vnp_Locale", "vn");
            vnp_Params.put("vnp_ReturnUrl", returnURL);
            vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

            Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
            String vnp_CreateDate = formatter.format(cld.getTime());
            vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
            cld.add(Calendar.MINUTE, 435);
            String vnp_ExpireDate = formatter.format(cld.getTime());
            vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

            // Build data to hash and querystring
            List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            StringBuilder query = new StringBuilder();
            Iterator<String> itr = fieldNames.iterator();
            while (itr.hasNext()) {
                String fieldName = itr.next();
                String fieldValue = vnp_Params.get(fieldName);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    // Build hash data
                    hashData.append(fieldName);
                    hashData.append('=');
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                    // Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                    if (itr.hasNext()) {
                        query.append('&');
                        hashData.append('&');
                    }
                }
            }
            String queryUrl = query.toString();
            String vnp_SecureHash = VNPayUtil.hmacSHA512(vnpayConfig.getVnpHashSecret(), hashData.toString());
            queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
            return vnpayConfig.getVnpUrl() + "?" + queryUrl;

        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

}