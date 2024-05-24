package it4409.group33.Controller;

import it4409.group33.Model.Order;
import it4409.group33.OrderService;
import it4409.group33.Util.JWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/order")
    public ResponseEntity<Order> createOrder(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        Long userId = Long.valueOf(JWT.getUserId(token));
        Order order = orderService.createOrderFromCart(userId);
        return ResponseEntity.ok(order);
    }
}

