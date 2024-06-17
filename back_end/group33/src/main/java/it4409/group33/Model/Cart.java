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

    public Cart(Long id,Long userId,String productJsonArray, double total, double discountedPrice, int totalQuantity, int totalProducts) {
        this.id = id;
        this.productJsonArray = productJsonArray;
        this.total = total;
        this.discountedPrice = discountedPrice;
        this.totalQuantity = totalQuantity;
        this.totalProducts = totalProducts;
        this.userId = userId;
    }

    public JSONArray getJSONArrayObject() {
        if(productJsonArray == null) {
            return null;
        }
        try {
            return new JSONArray(productJsonArray);
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
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

    public String getProductJsonArray() {
        return productJsonArray;
    }

    public void setJSONArrayObject(JSONArray jsonArray) {
        this.productJsonArray = jsonArray.toString();
    }

    public void setJSONArrayObject(String jsonArray) {
        this.productJsonArray = jsonArray;
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
