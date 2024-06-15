package it4409.group33.Controller;

import com.zaxxer.hikari.util.SuspendResumeLock;
import it4409.group33.Config.VnpayConfig;
import it4409.group33.Model.Order;
import it4409.group33.Repository.OrderRepository;
import it4409.group33.Service.OrderService;
import it4409.group33.Service.VnpayService;
import it4409.group33.Util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class PaymentController {

    @Autowired
    private VnpayService vnpayService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private VnpayConfig vnpayConfig;

    @Autowired
    private OrderService orderService;
    @GetMapping("/payment/create")
    public ResponseEntity<String> createPayment(@RequestParam Long orderId,HttpServletRequest request) throws NoSuchAlgorithmException {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + orderId));
        return new ResponseEntity<>(vnpayService.createPaymentUrl(order,request),HttpStatus.OK);
    }

    @GetMapping("/payment/vnpay_return")
    public ResponseEntity<String> paymentReturn(HttpServletRequest request) {
        Map<String, String> vnp_Params = new HashMap<>();
        Map<String, String[]> requestParams = request.getParameterMap();

        for (Map.Entry<String, String[]> entry : requestParams.entrySet()) {
            vnp_Params.put(entry.getKey(), entry.getValue()[0]);
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        if (vnp_SecureHash != null) {
            vnp_Params.remove("vnp_SecureHash");
        }

        String orderIdString = request.getParameter("vnp_OrderInfo");
        Long orderId = Long.valueOf(orderIdString.substring(21));

        String hashData = vnp_Params.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> {
                    String key = entry.getKey();
                    String value = entry.getValue();
                    if (value.contains(" ")) {
                        value = value.replace(" ", "+");
                    }
                    if (value.contains(":")) {
                        value = value.replace(":", "%3A");
                    }
                    return key + "=" + value;
                })
                .reduce((entry1, entry2) -> entry1 + "&" + entry2)
                .orElse("");

        String vnp_HashSecret = vnpayConfig.getVnpHashSecret();
        String secureHash = VNPayUtil.hmacSHA512(vnp_HashSecret, hashData);

        if (secureHash.equals(vnp_SecureHash)) {
            String x = "{\"code\":\"00\",\"message\":\"completed\"}";
            orderService.updateOrderStatusToPaid(orderId);
            return new ResponseEntity<>(x,HttpStatus.OK);
        } else {
            String x = "{\"code\":\"01\",\"message\":\"failure\"}";
            return new ResponseEntity<>(x, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/IPN")
    public String handleVNPayIPN(@RequestParam Map<String, String> params) {
        StringBuilder response = new StringBuilder("Received parameters: \n");
        for (Map.Entry<String, String> entry : params.entrySet()) {
            response.append(entry.getKey()).append(" : ").append(entry.getValue()).append("\n");
        }
        System.out.println(response.toString());
        return response.toString();
    }
}

