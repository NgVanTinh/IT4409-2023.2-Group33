package it4409.group33.Controller;

import it4409.group33.Config.VnpayConfig;
import it4409.group33.Model.Order;
import it4409.group33.Repository.OrderRepository;
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
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private VnpayService vnpayService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private VnpayConfig vnpayConfig;

    @GetMapping("/create")
    public String createPayment(@RequestParam Long orderId) throws NoSuchAlgorithmException {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + orderId));
        return vnpayService.createPaymentUrl(order);
    }

    @GetMapping("/vnpay_return")
    public ResponseEntity<String> paymentReturn(HttpServletRequest request) {
        Map<String, String> vnp_Params = new HashMap<>();
        Map<String, String[]> requestParams = request.getParameterMap();

        // In ra các tham số nhận được từ yêu cầu
        for (Map.Entry<String, String[]> entry : requestParams.entrySet()) {
            vnp_Params.put(entry.getKey(), entry.getValue()[0]);
            System.out.println(entry.getKey() + " = " + entry.getValue()[0]);
        }

        String vnp_ResponseCode = request.getParameter("vnp_ResponseCode");
        if ("00".equals(vnp_ResponseCode)) {
            return new ResponseEntity<>("Completed", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failure", HttpStatus.BAD_REQUEST);
        }
    }
}

