package it4409.group33.Controller;

import it4409.group33.Model.Product;
import it4409.group33.Repository.ProductRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static it4409.group33.Util.TimeStamp.getTimestamp;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        try {
            Product newProduct = productRepository.save(product);
            return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<String> getAllProduct(@RequestParam(defaultValue = "30") int limit, @RequestParam(defaultValue = "0") int skip,@RequestParam(required = false) String select) {
        List<Product> list = productRepository.findAll();
        String res = filterListProduct(select,list,limit,skip);
        if(res == null) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getProductById(@PathVariable Long id, @RequestParam(required = false) String select) {
        Optional<Product> productOptional = productRepository.findById(id);
        return productOptional.map(product -> new ResponseEntity<>(filterProduct(select,product).toString(), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/search")
    public ResponseEntity<String> searchProducts(@RequestParam String q,@RequestParam(defaultValue = "30") int limit, @RequestParam(defaultValue = "0") int skip,@RequestParam(required = false) String select) {
        List<Product> foundProducts = productRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q);
        String res = filterListProduct(select,foundProducts,limit,skip);
        if (foundProducts.isEmpty() || res == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getProductCategories() {
        List<String> categories = productRepository.findAll()
                .stream()
                .map(Product::getCategory)
                .distinct()
                .collect(Collectors.toList());

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            if (updatedProduct.getTitle() != null) {
                existingProduct.setTitle(updatedProduct.getTitle());
            }
            if (updatedProduct.getDescription() != null) {
                existingProduct.setDescription(updatedProduct.getDescription());
            }
            if (updatedProduct.getPrice() != null) {
                existingProduct.setPrice(updatedProduct.getPrice());
            }
            if (updatedProduct.getDiscountPercentage() != null) {
                existingProduct.setDiscountPercentage(updatedProduct.getDiscountPercentage());
            }
            if (updatedProduct.getRating() != null) {
                existingProduct.setRating(updatedProduct.getRating());
            }
            if (updatedProduct.getStock() != null) {
                existingProduct.setStock(updatedProduct.getStock());
            }
            if (updatedProduct.getBrand() != null) {
                existingProduct.setBrand(updatedProduct.getBrand());
            }
            if (updatedProduct.getCategory() != null) {
                existingProduct.setCategory(updatedProduct.getCategory());
            }
            if (updatedProduct.getThumbnail() != null) {
                existingProduct.setThumbnail(updatedProduct.getThumbnail());
            }
            if (updatedProduct.getImages() != null) {
                existingProduct.setImages(updatedProduct.getImages());
            }

            Product savedProduct = productRepository.save(existingProduct);
            return new ResponseEntity<>(savedProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setDeleted(true);
            existingProduct.setDeleteOn(getTimestamp());
            Product deletedProduct = productRepository.save(existingProduct);
            return new ResponseEntity<>(deletedProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<String> getProductsByCategory(@PathVariable String category,@RequestParam(defaultValue = "30") int limit, @RequestParam(defaultValue = "0") int skip,@RequestParam(required = false) String select) {
        List<Product> products = productRepository.findByCategory(category);
        String res = filterListProduct(select,products,limit,skip);
        if (products.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else if (res == null) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
    }



    @PostMapping("/test")
    public ResponseEntity<String> uploadImageAndData(
            @RequestParam("image") MultipartFile image,
            @RequestParam("data") String jsonData) {
        if (image.isEmpty()) {
            return ResponseEntity.badRequest().body("Please upload an image");
        }

        try {
            String base64Image = Base64.getEncoder().encodeToString(image.getBytes());
            JSONObject jsonObject = new JSONObject(jsonData);
            System.out.println("Base64 Image: " + base64Image);
            System.out.println("JSON Data: " + jsonObject);
            return ResponseEntity.ok("Image and JSON data received successfully");
        } catch (IOException | JSONException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing the image");
        }
    }

    public JSONObject filterProduct(String select, Product product) {
        JSONObject productObj = new JSONObject();
        try {
            if(select != null && !select.isEmpty()) {
                String[] selectList = select.split(",");
                for(String field : selectList) {
                    switch (field) {
                        case "id":
                            productObj.put("id", product.getId());
                            break;
                        case "title":
                            productObj.put("title", product.getTitle());
                            break;
                        case "description":
                            productObj.put("description", product.getDescription());
                            break;
                        case "price":
                            productObj.put("price", product.getPrice());
                            break;
                        case "discountPercentage":
                            productObj.put("discountPercentage", product.getDiscountPercentage());
                            break;
                        case "rating":
                            productObj.put("rating", product.getRating());
                            break;
                        case "stock":
                            productObj.put("stock", product.getStock());
                            break;
                        case "brand":
                            productObj.put("brand", product.getBrand());
                            break;
                        case "category":
                            productObj.put("category", product.getCategory());
                            break;
                        case "thumbnail":
                            productObj.put("thumbnail", product.getThumbnail());
                            break;
                        case "images":
                            productObj.put("images", new JSONArray(product.getImages()));
                            break;
                        case "isDeleted":
                            productObj.put("isDeleted", product.isDeleted());
                            break;
                        case "deletedOn":
                            productObj.put("deletedOn",product.getDeletedOn());
                        default:
                            break;
                    }
                }
            }
            else {
                productObj.put("id", product.getId());
                productObj.put("title", product.getTitle());
                productObj.put("description", product.getDescription());
                productObj.put("price", product.getPrice());
                productObj.put("discountPercentage", product.getDiscountPercentage());
                productObj.put("rating", product.getRating());
                productObj.put("stock", product.getStock());
                productObj.put("brand", product.getBrand());
                productObj.put("category", product.getCategory());
                productObj.put("thumbnail", product.getThumbnail());
                productObj.put("images", new JSONArray(product.getImages()));
                productObj.put("isDeleted",product.isDeleted());
                productObj.put("deleteOn",product.getDeletedOn());
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return productObj;
    }

    public String filterListProduct(String select, List<Product> list,int limit, int skip) {
        JSONObject response = new JSONObject();
        JSONArray productsArray = new JSONArray();
        int endIndex = Math.min(skip + limit, list.size());
        limit = 0;
        try {
            for(int i = skip; i < endIndex; i++) {
                limit++;
                Product product = list.get(i);
                productsArray.put(filterProduct(select,product));
            }
            response.put("products", productsArray);
            response.put("limit", limit);
            response.put("total",list.size());
            response.put("skip",skip);
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
        return response.toString();
    }


}
