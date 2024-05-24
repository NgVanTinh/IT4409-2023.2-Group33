package it4409.group33.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String productJsonArray;
    private Long userId;

    private double total;
    private double discountedPrice;

    private int totalQuantity;
    private int totalProducts;

    private LocalDateTime orderDate;

    public Order() {
    }

    public Order(String productJsonArray, Long userId, double total, double discountedPrice, int totalQuantity, int totalProducts, LocalDateTime orderDate) {
        this.productJsonArray = productJsonArray;
        this.userId = userId;
        this.total = total;
        this.discountedPrice = discountedPrice;
        this.totalQuantity = totalQuantity;
        this.totalProducts = totalProducts;
        this.orderDate = orderDate;
    }

    public void setProductJsonArray(String productJsonArray) {
        this.productJsonArray = productJsonArray;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public void setDiscountedPrice(double discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public void setTotalProducts(int totalProducts) {
        this.totalProducts = totalProducts;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public Long getId() {
        return id;
    }

    public String getProductJsonArray() {
        return productJsonArray;
    }

    public Long getUserId() {
        return userId;
    }

    public double getTotal() {
        return total;
    }

    public double getDiscountedPrice() {
        return discountedPrice;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public int getTotalProducts() {
        return totalProducts;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }
}

