package it4409.group33.Controller;

import it4409.group33.Exception.InvalidOrderStatusException;
import it4409.group33.Exception.OrderNotFoundException;
import it4409.group33.Model.Order;
import it4409.group33.Service.OrderService;
import it4409.group33.Service.VnpayService;
import it4409.group33.Util.JWT;
import jakarta.servlet.http.HttpServletRequest;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private VnpayService vnpayService;

    @PostMapping("/order")
    public ResponseEntity<String> createOrder(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody String requestBody, HttpServletRequest request) {
        if(token != null && JWT.validateJWT(token)) {
            Long userId = Long.valueOf(Objects.requireNonNull(JWT.getUserId(token)));
            try{
                Order order = orderService.createOrderFromCart(userId,requestBody);
                if(order == null) {
                    return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
                }
                JSONObject res = order.toJson();
                JSONObject req = new JSONObject(requestBody);
                String method = req.getString("method");
                if (method.equals("VNPay")) {
                    String VNPayURL = vnpayService.createPaymentUrl(order,request);
                    res.put("payURL",VNPayURL);
                } else {
                    res.put("payURL","");
                }
                return new ResponseEntity<>(res.toString(),HttpStatus.CREATED);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders(@RequestParam(required = false) Order.OrderStatus status) {
        List<Order> orders;
        if(status != null) {
            orders = orderService.getAllStatus(status);
        } else {
            orders = orderService.getAllOrders();
        }
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/orders/user")
    public ResponseEntity<String> getOrdersByUserId(@RequestParam(required = false) Order.OrderStatus status,@RequestHeader(HttpHeaders.AUTHORIZATION) String token) throws JSONException {
        if(token != null && JWT.validateJWT(token)) {
            Long userId = Long.valueOf(JWT.getUserId(token));
            JSONArray res = new JSONArray();
            List<Order> orders;
            if (status != null) {
                orders = orderService.getOrdersByUserIdAndStatus(userId, status);
                for(Order order : orders) {
                    res.put(order.toJson());
                }
            } else {
                orders = orderService.getOrdersByUserId(userId);
                for(Order order : orders) {
                    res.put(order.toJson());
                }
            }
            return ResponseEntity.ok(res.toString());
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/orders/{orderId}/pay")
    public ResponseEntity<Order> updateOrderStatusToPaid(@PathVariable Long orderId, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && JWT.validateJWT(token) && JWT.isUserOrAdmin(token)) {
            Order order;
            try {
                order = orderService.updateOrderStatusToPaid(orderId);
            } catch (InvalidOrderStatusException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            } catch (OrderNotFoundException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            } catch (RuntimeException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return ResponseEntity.ok(order);
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }

    }

    @PutMapping("/orders/{orderId}/ship")
    public ResponseEntity<Order> updateOrderStatusToShipping(@PathVariable Long orderId, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && JWT.validateJWT(token) && JWT.isAdmin(token)) {
            Order order;
            try {
                order = orderService.updateOrderStatusToShipping(orderId);
            } catch (InvalidOrderStatusException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            } catch (OrderNotFoundException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            } catch (RuntimeException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return ResponseEntity.ok(order);
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/orders/{orderId}/deliver")
    public ResponseEntity<Order> updateOrderStatusToDelivered(@PathVariable Long orderId, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && JWT.validateJWT(token) && JWT.isAdmin(token)) {
            Order order;
            try {
                order = orderService.updateOrderStatusToDelivered(orderId);
            } catch (InvalidOrderStatusException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            } catch (OrderNotFoundException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            } catch (RuntimeException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return ResponseEntity.ok(order);
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/orders/{orderId}/completed")
    public ResponseEntity<Order> updateOrderStatusToCompleted(@PathVariable Long orderId, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && JWT.validateJWT(token) && JWT.isUser(token)) {
            Order order;
            try {
                order = orderService.updateOrderStatusToCompleted(orderId);
            } catch (InvalidOrderStatusException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            } catch (OrderNotFoundException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            } catch (RuntimeException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return ResponseEntity.ok(order);
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/orders/{orderId}/cancelled")
    public ResponseEntity<Order> updateOrderStatusToCancelled(@PathVariable Long orderId, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && JWT.validateJWT(token) && JWT.isUser(token)) {
            Order order;
            try {
                order = orderService.updateOrderStatusToCancelled(orderId);
            } catch (InvalidOrderStatusException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            } catch (OrderNotFoundException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            } catch (RuntimeException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return ResponseEntity.ok(order);
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/orders/{orderId}/refunded")
    public ResponseEntity<Order> updateOrderStatusToRefunded(@PathVariable Long orderId, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && JWT.validateJWT(token) && JWT.isUser(token)) {
            Order order;
            try {
                order = orderService.updateOrderStatusToRefunded(orderId);
            } catch (InvalidOrderStatusException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            } catch (OrderNotFoundException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            } catch (RuntimeException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return ResponseEntity.ok(order);
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/orders/quantity-sold-by-brand")
    public Map<String, Long> getTotalQuantityByBrand() {
        return orderService.getTotalQuantityByBrand();
    }

    @GetMapping("/orders/list-product-sold-by-brand")
    public List<Map<String, Object>> getProductsByBrand(@RequestParam String brand) {
        return orderService.getProductsByBrand(brand);
    }

    @GetMapping("/orders/best-seller")
    public List<Map<String, Object>> getProductsTotalQuantitySold() {
        return orderService.getProductsTotalQuantitySold();
    }

    @GetMapping("/orders/number-orders")
    public ResponseEntity<String> count() {
        long x = orderService.count();
        String xx = "{\"orders\":" + String.valueOf(x) + "}";
        return new ResponseEntity<>(xx,HttpStatus.OK);
    }

    @GetMapping("/orders/sum")
    public ResponseEntity<String> sum() {
        Double x = orderService.sum();
        String xx = "{\"sum\":" + String.valueOf(x) + "}";
        return new ResponseEntity<>(xx,HttpStatus.OK);
    }

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<Order> viewOrder(@PathVariable Long orderId, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && JWT.validateJWT(token) && JWT.isUserOrAdmin(token)) {
            Order order = orderService.findById(orderId);
            if(order != null) {
                return new ResponseEntity<>(order,HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

}

