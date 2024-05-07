package it4409.group33.Model;

import jakarta.persistence.*;
import org.json.JSONArray;
import org.json.JSONException;

@Entity
@Table(name = "carts")
public class Cart {
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

    public Cart() {
    }

    public Cart(Long userId,String productJsonArray, double total, double discountedPrice, int totalQuantity, int totalProducts) {
        this.productJsonArray = productJsonArray;
        this.total = total;
        this.discountedPrice = discountedPrice;
        this.totalQuantity = totalQuantity;
        this.totalProducts = totalProducts;
        this.userId = userId;
    }

    public JSONArray getJSONArrayObject() {
        try {
            return new JSONArray(productJsonArray);
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void setJSONArrayObject(JSONArray jsonArray) {
        this.productJsonArray = jsonArray.toString();
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
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
}
