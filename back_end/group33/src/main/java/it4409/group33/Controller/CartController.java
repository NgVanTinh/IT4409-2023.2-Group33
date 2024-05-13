package it4409.group33.Controller;

import it4409.group33.Model.Cart;
import it4409.group33.Model.Product;
import it4409.group33.Repository.CartRepository;
import it4409.group33.Repository.ProductRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/carts")
public class CartController {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/{id}")
    public ResponseEntity<String> get1Cart(@PathVariable Long id) {
        Optional<Cart> cartOptional = cartRepository.findById(id);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            try {
                JSONObject cartJSON = X(cart.getJSONArrayObject());
                cartJSON.put("userId",cart.getUserId());
                cartJSON.put("id",cart.getId());
                return new ResponseEntity<>(cartJSON.toString(),HttpStatus.OK);
            } catch (JSONException e) {
                e.printStackTrace();
                return null;
            }
        } else {
            return null;
        }
    }

    @GetMapping
    public ResponseEntity<String> getAllCart() {
        List<Cart> listAllCart = cartRepository.findAll();
        JSONObject res = new JSONObject();
        try {
            JSONArray jsonArray = new JSONArray();
            for (Cart cart : listAllCart) {
                JSONObject jsonObject = XX(cart.getJSONArrayObject(),cart.getUserId(),cart.getId());
                jsonArray.put(jsonObject);
            }
            res.put("carts",jsonArray);
            res.put("total",listAllCart.size());
            res.put("skip",0);
            res.put("limit",listAllCart.size());
            return new ResponseEntity<>(res.toString(),HttpStatus.OK);
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody String requestBody) {
        try {
            JSONObject req = new JSONObject(requestBody);
            Long userId = req.getLong("userId");
            JSONArray products = req.getJSONArray("products");
            Cart cart = cartRepository.findByUserId(userId);

            JSONObject X = new JSONObject();
            if(cart == null) {
                X = X(products);
                cart = new Cart(userId,products.toString(),X.getDouble("total"),X.getDouble("discountedTotal"),X.getInt("totalQuantity"),X.getInt("totalProducts"));
                cartRepository.save(cart);
                X.put("userId",userId);
                X.put("id",cart.getId());
                return new ResponseEntity<>(X.toString(), HttpStatus.CREATED);
            } else {
                X = X(cart.getJSONArrayObject());
                X.put("userId",userId);
                X.put("id",cart.getId());
                return new ResponseEntity<>(X.toString(), HttpStatus.OK);
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }

    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<String> getUserCart(@PathVariable Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if(cart == null) {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        } else {
            try {
                return new ResponseEntity<>(XX(cart.getJSONArrayObject(),cart.getUserId(),cart.getId()).toString(),HttpStatus.OK);
            } catch (JSONException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCart(@PathVariable Long id,@RequestBody String requestBody) {
        try {
            JSONObject req = new JSONObject(requestBody);
            boolean merge = req.getBoolean("merge");
            JSONArray updateArray = req.getJSONArray("products");
            Optional<Cart> cartOptional = cartRepository.findById(id);
            if (cartOptional.isPresent() && merge) {
                Cart cart = cartOptional.get();
                JSONArray oldArray = minimizeProductArray(cart.getJSONArrayObject());

                JSONObject res = XX(merge(updateArray,oldArray),cart.getUserId(),cart.getId());
                cart.setJSONArrayObject(res.getJSONArray("products"));
                cart.setTotal(res.getDouble("total"));
                cart.setDiscountedPrice(res.getDouble("discountedTotal"));
                cart.setTotalQuantity(res.getInt("totalQuantity"));
                cart.setTotalProducts(res.getInt("totalProducts"));
                cartRepository.save(cart);
                return new ResponseEntity<>(res.toString(),HttpStatus.OK);
            } else {
                return null;
            }

        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }

    }

    public JSONArray merge(JSONArray updateArray, JSONArray oldArray) throws JSONException {
        for (int i = 0; i < updateArray.length(); i++) {
            boolean found = false;
            JSONObject updateItem = updateArray.getJSONObject(i);
            for (int j = 0; j < oldArray.length(); j++) {
                JSONObject oldItem = oldArray.getJSONObject(j);
                if (updateItem.getInt("id") == oldItem.getInt("id")) {
                    found = true;
                    int updateQuantity = updateItem.getInt("quantity");
                    int oldQuantity = oldItem.getInt("quantity");
                    oldItem.put("quantity", oldQuantity + updateQuantity);
                    break;
                }
            }
            if (!found) {
                oldArray.put(updateItem);
            }
        }

        // Remove objects with quantity less than zero
        for (int k = 0; k < oldArray.length(); k++) {
            JSONObject item = oldArray.getJSONObject(k);
            int quantity = item.getInt("quantity");
            if (quantity <= 0) {
                oldArray.remove(k);
                k--; // Adjust index after removal
            }
        }

        return oldArray;
    }

    public JSONArray minimizeProductArray(JSONArray src) throws JSONException {
        JSONArray des = new JSONArray();
        for(int i = 0; i < src.length(); i++) {
            JSONObject item = src.getJSONObject(i);
            JSONObject desItem = new JSONObject();
            desItem.put("id",item.getLong("id"));
            desItem.put("quantity",item.getInt("quantity"));
            des.put(desItem);
        }
        return des;
    }

    public JSONObject X(JSONArray products) throws JSONException {
        double totalX = 0;
        double discountedTotal = 0;
        int totalProducts = 0;
        int totalQuantity = 0;
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < products.length(); i++) {
            JSONObject item = products.getJSONObject(i);
            long productId = item.getLong("id");
            int quantity = item.getInt("quantity");
            totalQuantity += quantity;
            totalProducts++;
            Product product = productRepository.findByProductId(productId);
            if(product != null) {
                double total = product.getPrice() * quantity;
                double discountedPrice = total * (100.0 - product.getDiscountPercentage()) / 100;
                discountedTotal += discountedPrice;
                totalX += total;
                item.put("title",product.getTitle());
                item.put("price",product.getPrice());
                item.put("discountPercentage",product.getDiscountPercentage());
                item.put("thumbnail",product.getThumbnail());
                item.put("total",total);
                item.put("discountedPrice",discountedPrice);
                jsonArray.put(item);
            }
        }
        jsonObject.put("products",jsonArray);
        jsonObject.put("total",totalX);
        jsonObject.put("discountedTotal",discountedTotal);
        jsonObject.put("totalProducts",totalProducts);
        jsonObject.put("totalQuantity",totalQuantity);
        return jsonObject;
    }

    public JSONObject XX(JSONArray products,Long userId, Long id) throws JSONException {
        JSONObject jsonObject = X(products);
        jsonObject.put("userId",userId);
        jsonObject.put("id",id);
        return jsonObject;
    }

}
