package it4409.group33.Controller;

import it4409.group33.Model.Cart;
import it4409.group33.Model.Product;
import it4409.group33.Repository.CartRepository;
import it4409.group33.Repository.ProductRepository;
import it4409.group33.Service.CartService;
import it4409.group33.Util.JWT;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/carts")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private JWT jwt;

    @GetMapping("/{id}")
    public ResponseEntity<String> get1Cart(@PathVariable Long id,@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && jwt.validateJWT(token) && JWT.isUserOrAdmin(token)) {
            String newCart = cartService.get1Cart(id);
            if(newCart != null) {
                return new ResponseEntity<>(newCart,HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping
    public ResponseEntity<String> getAllCart(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && jwt.validateJWT(token) && JWT.isAdmin(token)) {
            String res = cartService.getAllCart();
            if(res != null) {
                return new ResponseEntity<>(res,HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<String> getUserCart(@PathVariable Long userId,@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && jwt.validateJWT(token)) {
            if(JWT.getUserId(token).equals(String.valueOf(userId)) || JWT.isAdmin(token)) {
                String newCart = cartService.getUserCart(userId);
                if(newCart != null) {
                    return new ResponseEntity<>(newCart,HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
            }
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/add-to-cart")
    public ResponseEntity<String> updateCart(@RequestBody String requestBody,@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && jwt.validateJWT(token) && JWT.isUserOrAdmin(token)) {

            try {
                String newCart = cartService.addToCart(requestBody,token);
                if(newCart != null) {
                    return new ResponseEntity<>(newCart,HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
                }
            } catch (JSONException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/clear-cart")
    public ResponseEntity<String> clearCart(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && jwt.validateJWT(token) && JWT.isUserOrAdmin(token)) {
            Long userId = Long.valueOf(Objects.requireNonNull(JWT.getUserId(token)));
            if(cartService.clearCart(userId)) {
                return new ResponseEntity<>(cartService.getUserCart(userId), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/delete-product")
    public ResponseEntity<String> delete1ProductInCart(@RequestParam Long productId,@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && jwt.validateJWT(token) && JWT.isUserOrAdmin(token)) {
            try {
                String newCart = cartService.addToCart("{\"products\":[]}",token,productId);
                if(newCart != null) {
                    return new ResponseEntity<>(newCart,HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
                }
            } catch (JSONException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }
}
