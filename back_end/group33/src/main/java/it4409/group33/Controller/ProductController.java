package it4409.group33.Controller;

import it4409.group33.Model.Category;
import it4409.group33.Model.Product;
import it4409.group33.Repository.ProductRepository;
import it4409.group33.Service.CategoryService;
import it4409.group33.Util.JWT;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

import static it4409.group33.Service.CloudinaryService.uploadAndGetUrl;
import static it4409.group33.Util.TimeStamp.getTimestamp;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody Product product, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && JWT.validateJWT(token) && JWT.isAdmin(token)) {
            try {
                Product newProduct = productRepository.save(product);
                return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
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
    public List<Object[]> getAllVietnameseNames() {
        return categoryService.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct,@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && JWT.validateJWT(token) && JWT.isAdmin(token)) {
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
                if (updatedProduct.getSpec() != null) {
                    existingProduct.setSpec(updatedProduct.getSpec());
                }

                Product savedProduct = productRepository.save(existingProduct);
                return new ResponseEntity<>(savedProduct, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable Long id,@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if(token != null && JWT.validateJWT(token) && JWT.isAdmin(token)) {
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
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<String> getProductsByCategory(@PathVariable Long categoryId,@RequestParam(defaultValue = "30") int limit, @RequestParam(defaultValue = "0") int skip,@RequestParam(required = false) String select) {
        String categoryX = categoryService.getVietnameseNameById(categoryId);
        List<Product> products = productRepository.findByCategory(categoryX);
        String res = filterListProduct(select,products,limit,skip);
        if (products.isEmpty()) {
            String string404 = "{\"total\":0,\"limit\":0,\"skip\":0,\"products\":[]}";
            return new ResponseEntity<>(string404, HttpStatus.NOT_FOUND);
        } else if (res == null) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(res, HttpStatus.OK);
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
                        case "spec":
                            productObj.put("spec",product.getSpec());
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
                productObj.put("spec",product.getSpec());
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

    @PostMapping("test")
    public ResponseEntity<Product> createProduct(@RequestParam("thumbnail") MultipartFile thumbnail,
                                                 @RequestParam("image") List<MultipartFile> images,
                                                 @RequestParam("title") String title,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("price") Double price,
                                                 @RequestParam("discountPercentage") Double discountPercentage,
                                                 @RequestParam("rating") Double rating,
                                                 @RequestParam("stock") Integer stock,
                                                 @RequestParam("brand") String brand,
                                                 @RequestParam("category") String category,
                                                 @RequestParam("spec") String spec,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ){

        if(token != null && JWT.validateJWT(token) && JWT.isAdmin(token)) {

            List<String> X = new ArrayList<>();

            String thumb = uploadAndGetUrl(thumbnail);
            if (thumb.equals("Upload failed")) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            for (MultipartFile image : images) {
                String tmp = uploadAndGetUrl(image);
                if (!tmp.equals("Upload failed")) {
                    X.add(tmp);
                }
            }

            Product product = new Product(title, description, price, discountPercentage, rating, stock, brand, category, thumb, X, spec);
            productRepository.save(product);
            return new ResponseEntity<>(product, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/brand")
    public ResponseEntity<List<String>> getAllBrands() {
        List<String> categories = productRepository.findAll()
                .stream()
                .map(Product::getBrand)
                .distinct()
                .collect(Collectors.toList());

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/same-products")
    public ResponseEntity<String> getSameProducts(
            @RequestParam Long id,
            @RequestParam(defaultValue = "30") int limit,
            @RequestParam(defaultValue = "0") int skip,
            @RequestParam(required = false) String select) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (!productOptional.isPresent()) {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        Product product = productOptional.get();
        String brand = product.getBrand();
        String category = product.getCategory();

        List<Product> sameBrandProducts = productRepository.findByBrand(brand);
        List<Product> sameCategoryProducts = productRepository.findByCategory(category);

        Set<Product> sameProductsSet = new HashSet<>();
        sameProductsSet.addAll(sameBrandProducts);
        sameProductsSet.addAll(sameCategoryProducts);

        sameProductsSet.remove(product);
        List<Product> list = new ArrayList<>(sameProductsSet);
        return new ResponseEntity<>(filterListProduct(select,list,limit,skip),HttpStatus.OK);
    }
}
