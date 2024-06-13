package it4409.group33.Service;

import it4409.group33.Exception.InvalidOrderStatusException;
import it4409.group33.Exception.OrderNotFoundException;
import it4409.group33.Model.Cart;
import it4409.group33.Model.Order;
import it4409.group33.Repository.CartRepository;
import it4409.group33.Repository.OrderRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public Order createOrderFromCart(Long userId, String addressJSON) throws JSONException {

        JSONObject X = new JSONObject(addressJSON);
        String address = X.toString();
        if(address == null) {
            throw new NullPointerException("address null");
        }
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            throw new RuntimeException("Cart not found for user id: " + userId);
        }
        Order order = new Order();
        order.setProductJsonArray(cart.getProductJsonArray());
        order.setUserId(cart.getUserId());
        order.setTotal(cart.getTotal());
        order.setDiscountedPrice(cart.getDiscountedPrice());
        order.setTotalQuantity(cart.getTotalQuantity());
        order.setTotalProducts(cart.getTotalProducts());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Order.OrderStatus.CREATED);
        order.setAddressJSON(address);
        orderRepository.save(order);
        cartRepository.delete(cart);
        return order;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getAllStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getOrdersByUserIdAndStatus(Long userId,Order.OrderStatus status) {
        return orderRepository.findByUserIdAndStatus(userId,status);
    }

    public Order updateOrderStatusToPaid(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getStatus() == Order.OrderStatus.CREATED) {
                order.setStatus(Order.OrderStatus.AWAITING_SHIPMENT);
                return orderRepository.save(order);
            } else {
                throw new InvalidOrderStatusException("Only for CREATED status");
            }
        } else {
            throw new OrderNotFoundException("Order not found with ID: " + orderId);
        }
    }

    public Order updateOrderStatusToShipping(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getStatus() == Order.OrderStatus.AWAITING_SHIPMENT) {
                order.setStatus(Order.OrderStatus.SHIPPING);
                return orderRepository.save(order);
            } else {
                throw new InvalidOrderStatusException("Only for AWAITING_SHIPMENT status");
            }
        } else {
            throw new OrderNotFoundException("Order not found with ID: " + orderId);
        }
    }

    public Order updateOrderStatusToDelivered(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getStatus() == Order.OrderStatus.SHIPPING) {
                order.setStatus(Order.OrderStatus.DELIVERED);
                return orderRepository.save(order);
            } else {
                throw new InvalidOrderStatusException("Only for SHIPPING status");
            }
        } else {
            throw new OrderNotFoundException("Order not found with ID: " + orderId);
        }
    }

    public Order updateOrderStatusToCompleted(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getStatus() == Order.OrderStatus.DELIVERED) {
                order.setStatus(Order.OrderStatus.COMPLETED);
                return orderRepository.save(order);
            } else {
                throw new InvalidOrderStatusException("Only for DELIVERED status");
            }
        } else {
            throw new OrderNotFoundException("Order not found with ID: " + orderId);
        }
    }

    //Only CREATED -> CANCELLED
    public Order updateOrderStatusToCancelled(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            Order.OrderStatus currentStatus = order.getStatus();
            if (currentStatus == Order.OrderStatus.CREATED) {
                order.setStatus(Order.OrderStatus.CANCELLED);
                return orderRepository.save(order);
            } else {
                throw new InvalidOrderStatusException("Only for CREATED status");
            }
        } else {
            throw new OrderNotFoundException("Order not found with ID: " + orderId);
        }
    }

    //Only AWAITING_SHIPMENT, DELIVERED -> REFUNDED
    public Order updateOrderStatusToRefunded(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            Order.OrderStatus currentStatus = order.getStatus();
            if (currentStatus == Order.OrderStatus.DELIVERED || currentStatus == Order.OrderStatus.AWAITING_SHIPMENT) {
                order.setStatus(Order.OrderStatus.REFUNDED);
                return orderRepository.save(order);
            } else {
                throw new InvalidOrderStatusException("Only for DELIVERED and AWAITING_SHIPMENT status");
            }
        } else {
            throw new OrderNotFoundException("Order not found with ID: " + orderId);
        }
    }

    public Map<String, Long> getTotalQuantityByBrand() {
        List<Object[]> results = orderRepository.findTotalQuantityByBrand();
        Map<String, Long> brandQuantityMap = new HashMap<>();
        for (Object[] result : results) {
            String brand = (String) result[0];
            Long totalQuantity = ((Number) result[1]).longValue();
            brandQuantityMap.put(brand, totalQuantity);
        }
        return brandQuantityMap;
    }

    public List<Map<String, Object>> getProductsByBrand(String brand) {
        List<Object[]> results = orderRepository.findProductsByBrand(brand);
        List<Map<String, Object>> productList = new ArrayList<>();
        for (Object[] result : results) {
            Map<String, Object> productMap = new HashMap<>();
            productMap.put("title", result[0]);
            productMap.put("quantity", result[1]);
            productList.add(productMap);
        }
        return productList;
    }

    public List<Map<String, Object>> getProductsTotalQuantitySold() {
        List<Object[]> results = orderRepository.findProductsTotalQuantitySold();
        List<Map<String, Object>> productList = new ArrayList<>();
        for (Object[] result : results) {
            Map<String, Object> productMap = new HashMap<>();
            productMap.put("product_id", result[0]);
            productMap.put("product_title", result[1]);
            productMap.put("total_quantity_sold",result[2]);
            productList.add(productMap);
        }
        return productList;
    }

    public long count() {
        return orderRepository.count();
    }

    public Double sum() {
        return orderRepository.sum();
    }

}

