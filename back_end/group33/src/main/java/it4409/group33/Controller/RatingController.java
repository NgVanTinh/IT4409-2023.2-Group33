package it4409.group33.Controller;

import it4409.group33.Model.Order;
import it4409.group33.Model.Rating;
import it4409.group33.Service.OrderService;
import it4409.group33.Service.RatingService;
import it4409.group33.Service.UserService;
import it4409.group33.Util.JWT;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static it4409.group33.Util.TimeStamp.getDate;

@RestController
@RequestMapping("/rating")
public class RatingController {
    @Autowired
    private RatingService ratingService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private JWT jwt;

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestParam Long orderId,
                                         @RequestParam Long productId,
                                         @RequestBody String requestBody,
                                         @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        if(token != null && jwt.validateJWT(token) && JWT.isUser(token)) {
            Long userIdX = Long.valueOf(JWT.getUserId(token));
            Order order = orderService.findById(orderId);
            String productJSON = order.getProductJsonArray();
            if (!order.getStatus().equals(Order.OrderStatus.COMPLETED) || !userIdX.equals(order.getUserId())) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            try {
                JSONObject req = new JSONObject(requestBody);
                String comment = req.getString("comment");
                int rate = req.getInt("rate");
                JSONArray products = new JSONArray(productJSON);
                for (int i = 0; i < products.length(); i++) {
                    JSONObject product = products.getJSONObject(i);
                    Long productIdY = product.getLong("id");
                    if (productIdY == productId) {
                        if (ratingService.isRatingExisted(order.getUserId(), productIdY, orderId)) {
                            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
                        }
                        Rating rating = new Rating(comment, rate, order.getUserId(), productIdY, orderId, getDate());
                        ratingService.save(rating);
                        ratingService.updateProductRating(productIdY);
                        JSONObject ratingJSON = rating.toJSON();
                        ratingJSON.put("username",userService.getUserNameById(order.getUserId()));
                        ratingJSON.put("fullName",userService.getFullNameById(order.getUserId()));
                        return new ResponseEntity<>(ratingJSON.toString(), HttpStatus.OK);
                    }
                }
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            } catch (JSONException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<String> getRatingsByProductId(@PathVariable Long id) {
        List<Rating> ratings = ratingService.getRatingsByProductId(id);
        JSONArray res = new JSONArray();
        for (Rating rating: ratings) {
            try {
                Long userId = rating.getUserId();
                JSONObject ratingJSON = rating.toJSON();
                ratingJSON.put("username",userService.getUserNameById(userId));
                ratingJSON.put("fullName",userService.getFullNameById(userId));
                res.put(ratingJSON);

            } catch (JSONException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return ResponseEntity.ok(res.toString());
    }

}
