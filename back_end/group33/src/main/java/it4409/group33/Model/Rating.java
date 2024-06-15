package it4409.group33.Model;

import jakarta.persistence.*;
import org.checkerframework.checker.units.qual.K;
import org.json.JSONException;
import org.json.JSONObject;

@Entity
@Table(name = "rating")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String comment;

    private int rate;
    private Long userId;
    private Long productId;
    private Long orderId;

    private String date;

    public Rating() {
    }

    public Rating(String comment, int rate, Long userId, Long productId, Long orderId, String date) {
        this.comment = comment;
        this.rate = rate;
        this.userId = userId;
        this.productId = productId;
        this.orderId = orderId;
        this.date = date;
    }

    public JSONObject toJSON() throws JSONException {
        JSONObject res = new JSONObject();
        res.put("orderId",orderId);
        res.put("rate",rate);
        res.put("userId",userId);
        res.put("productId",productId);
        res.put("comment",comment);
        res.put("id",id);
        res.put("date",date);
        return res;
    }

    public Long getId() {
        return id;
    }

    public String getComment() {
        return comment;
    }

    public int getRate() {
        return rate;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getProductId() {
        return productId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
}
