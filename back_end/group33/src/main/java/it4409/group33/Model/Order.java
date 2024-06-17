package it4409.group33.Model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import org.json.JSONException;
import org.json.JSONObject;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
    private String phone;
    private String method;

    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private String addressJSON;

    public Order() {
    }

    public Order(String productJsonArray, Long userId, double total, double discountedPrice, int totalQuantity, int totalProducts, LocalDateTime orderDate, OrderStatus status, String addressJSON, String phone, String method) {
        this.productJsonArray = productJsonArray;
        this.userId = userId;
        this.total = total;
        this.discountedPrice = discountedPrice;
        this.totalQuantity = totalQuantity;
        this.totalProducts = totalProducts;
        this.orderDate = orderDate;
        this.status = status;
        this.addressJSON = addressJSON;
        this.phone = phone;
        this.method = method;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
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

    public void setAddressJSON(String addressJSON) {
        this.addressJSON = addressJSON;
    }

    public String getAddressJSON() {
        return addressJSON;
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

    public JSONObject toJson() throws JSONException {
        DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
        JSONObject res = new JSONObject();
        res.put("id",this.id);
        res.put("productJsonArray",this.productJsonArray);
        res.put("userId",this.userId);
        res.put("total",this.total);
        res.put("discountedPrice",this.discountedPrice);
        res.put("totalQuantity",this.totalQuantity);
        res.put("totalProducts",this.totalProducts);
        res.put("orderDate",this.orderDate.format(FORMATTER));
        res.put("status",this.status);
        res.put("addressJSON",this.addressJSON);
        res.put("phone",this.phone);
        res.put("method",this.method);
        return res;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public enum OrderStatus {
        CREATED,
        AWAITING_SHIPMENT,
        SHIPPING,
        DELIVERED,
        COMPLETED,
        CANCELLED,
        REFUNDED
    }
}

