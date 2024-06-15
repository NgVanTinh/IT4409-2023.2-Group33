package it4409.group33.Service;

import it4409.group33.Model.Product;
import it4409.group33.Model.Rating;
import it4409.group33.Repository.ProductRepository;
import it4409.group33.Repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RatingService {
    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private ProductRepository productRepository;

    public Rating save(Rating rating) {
        return ratingRepository.save(rating);
    }

    public boolean isRatingExisted(Long userId, Long productId, Long orderId) {
        return ratingRepository.existsByUserIdAndProductIdAndOrderId(userId, productId, orderId);
    }

    @Transactional
    public void updateProductRating(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            double averageRating = ratingRepository.calculateAverageRatingByProductId(productId);
            int ratingCount = ratingRepository.countRatingsByProductId(productId);
            product.setRating(averageRating);
            productRepository.save(product);
        }
    }

    public List<Rating> getRatingsByProductId(Long productId) {
        return ratingRepository.findByProductId(productId);
    }

}
