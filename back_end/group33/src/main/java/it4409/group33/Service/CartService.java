package it4409.group33.Service;

import it4409.group33.Model.Cart;
import it4409.group33.Model.Product;
import it4409.group33.Repository.CartRepository;
import it4409.group33.Repository.ProductRepository;
import it4409.group33.Util.JWT;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public boolean createEmptyCart(Long userId){
        Cart cart = new Cart(userId,userId,"[]",0,0,0,0);
        cartRepository.save(cart);
        return cartRepository.findById(userId).isPresent();
    }

    @Transactional
    public boolean clearCart(Long id) {
        Optional<Cart> cartOptional = cartRepository.findById(id);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            cart.setTotalProducts(0);
            cart.setDiscountedPrice(0);
            cart.setTotal(0);
            cart.setTotalQuantity(0);
            cart.setJSONArrayObject("[]");
            cartRepository.save(cart);
            return true;
        } else {
            return false;
        }
    }

    public String addToCart(String requestBody, String token) throws JSONException{
        JSONObject req = new JSONObject(requestBody);
        JSONArray updateArray = req.getJSONArray("products");
        Long id = Long.valueOf(JWT.getUserId(token));
        Optional<Cart> cartOptional = cartRepository.findById(id);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            JSONArray oldArray = minimizeProductArray(cart.getJSONArrayObject());
            JSONObject res = XX(merge(updateArray, oldArray), cart.getUserId(), cart.getId());
            cart.setJSONArrayObject(res.getJSONArray("products"));
            cart.setTotal(res.getDouble("total"));
            cart.setDiscountedPrice(res.getDouble("discountedTotal"));
            cart.setTotalQuantity(res.getInt("totalQuantity"));
            cart.setTotalProducts(res.getInt("totalProducts"));
            cartRepository.save(cart);
            return res.toString();
        } else {
            return null;
        }
    }

    public String addToCart(String requestBody, String token, Long productId) throws JSONException{
        JSONObject req = new JSONObject(requestBody);
        JSONArray updateArray = req.getJSONArray("products");
        Long id = Long.valueOf(JWT.getUserId(token));
        Optional<Cart> cartOptional = cartRepository.findById(id);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            JSONArray oldArray = minimizeProductArray(cart.getJSONArrayObject());
            JSONObject res = XX(merge(updateArray, oldArray), cart.getUserId(), cart.getId(),productId);
            cart.setJSONArrayObject(res.getJSONArray("products"));
            cart.setTotal(res.getDouble("total"));
            cart.setDiscountedPrice(res.getDouble("discountedTotal"));
            cart.setTotalQuantity(res.getInt("totalQuantity"));
            cart.setTotalProducts(res.getInt("totalProducts"));
            cartRepository.save(cart);
            return res.toString();
        } else {
            return null;
        }
    }

    public String getAllCart() {
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
            return res.toString();
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String getUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            return null;
        } else {
            try {
                return XX(cart.getJSONArrayObject(), cart.getUserId(), cart.getId()).toString();
            } catch (JSONException e) {
                e.printStackTrace();
                return null;
            }
        }
    }

    public Cart getUserCartById(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public String get1Cart(Long id) {
        Optional<Cart> cartOptional = cartRepository.findById(id);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            try {
                JSONObject cartJSON = X(cart.getJSONArrayObject());
                cartJSON.put("userId",cart.getUserId());
                cartJSON.put("id",cart.getId());
                return cartJSON.toString();
            } catch (JSONException e) {
                e.printStackTrace();
                return null;
            }
        } else {
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

    public JSONObject X(JSONArray products, Long id) throws JSONException {
        double totalX = 0;
        double discountedTotal = 0;
        int totalProducts = 0;
        int totalQuantity = 0;
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        if(products != null) {
            for (int i = 0; i < products.length(); i++) {
                JSONObject item = products.getJSONObject(i);
                long productId = item.getLong("id");
                Long idX = productId;
                if(!idX.equals(id)) {
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
            }
        }
        jsonObject.put("products",jsonArray);
        jsonObject.put("total",totalX);
        jsonObject.put("discountedTotal",discountedTotal);
        jsonObject.put("totalProducts",totalProducts);
        jsonObject.put("totalQuantity",totalQuantity);
        return jsonObject;
    }

    public JSONObject XX(JSONArray products,Long userId, Long id, Long productId) throws JSONException {
        JSONObject jsonObject = X(products,productId);
        jsonObject.put("userId",userId);
        jsonObject.put("id",id);
        return jsonObject;
    }

    public JSONObject X(JSONArray products) throws JSONException {
        double totalX = 0;
        double discountedTotal = 0;
        int totalProducts = 0;
        int totalQuantity = 0;
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        if(products != null) {
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
