package it4409.group33;

import it4409.group33.Model.Cart;
import it4409.group33.Model.Order;
import it4409.group33.Repository.CartRepository;
import it4409.group33.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public Order createOrderFromCart(Long userId) {
        // Find the cart by userId
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            throw new RuntimeException("Cart not found for user id: " + userId);
        }

        // Create a new Order from the Cart data
        Order order = new Order();
        order.setProductJsonArray(cart.getProductJsonArray());
        order.setUserId(cart.getUserId());
        order.setTotal(cart.getTotal());
        order.setDiscountedPrice(cart.getDiscountedPrice());
        order.setTotalQuantity(cart.getTotalQuantity());
        order.setTotalProducts(cart.getTotalProducts());
        order.setOrderDate(LocalDateTime.now());

        // Save the Order
        orderRepository.save(order);

        // Clear the cart (optional)
        cartRepository.delete(cart);

        return order;
    }
}

