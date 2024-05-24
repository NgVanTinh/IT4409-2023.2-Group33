package it4409.group33.Controller;

import it4409.group33.Model.Order;
import it4409.group33.OrderService;
import it4409.group33.Util.JWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders(@RequestParam(required = false) Order.OrderStatus status) {
        List<Order> orders = new ArrayList<>();
        if(status != null) {
            orders = orderService.getAllStatus(status);
        } else {
            orders = orderService.getAllOrders();
        }
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/orders/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(
            @PathVariable Long userId,
            @RequestParam(required = false) Order.OrderStatus status
    ) {
        List<Order> orders = new ArrayList<>();
        if(status != null) {
            orders = orderService.getOrdersByUserIdAndStatus(userId,status);
        } else {
            orders = orderService.getOrdersByUserId(userId);
        }
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/orders/{orderId}/pay")
    public ResponseEntity<Order> updateOrderStatusToPaid(@PathVariable Long orderId) {
        Order order = new Order();
        try {
            order = orderService.updateOrderStatusToPaid(orderId);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(order);
    }

    @PutMapping("/orders/{orderId}/ship")
    public ResponseEntity<Order> updateOrderStatusToShipping(@PathVariable Long orderId) {
        Order order = new Order();
        try {
            order = orderService.updateOrderStatusToShipping(orderId);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(order);
    }

    @PutMapping("/orders/{orderId}/deliver")
    public ResponseEntity<Order> updateOrderStatusToDelivered(@PathVariable Long orderId) {
        Order order = new Order();
        try {
            order = orderService.updateOrderStatusToDelivered(orderId);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(order);
    }

    @PutMapping("/orders/{orderId}/completed")
    public ResponseEntity<Order> updateOrderStatusToCompleted(@PathVariable Long orderId) {
        Order order = new Order();
        try {
            order = orderService.updateOrderStatusToCompleted(orderId);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(order);
    }

    @PutMapping("/orders/{orderId}/cancelled")
    public ResponseEntity<Order> updateOrderStatusToCancelled(@PathVariable Long orderId) {
        Order order = new Order();
        try {
            order = orderService.updateOrderStatusToCancelled(orderId);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(order);
    }

    @PutMapping("/orders/{orderId}/refunded")
    public ResponseEntity<Order> updateOrderStatusToRefunded(@PathVariable Long orderId) {
        Order order = new Order();
        try {
            order = orderService.updateOrderStatusToRefunded(orderId);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(order);
    }

}

