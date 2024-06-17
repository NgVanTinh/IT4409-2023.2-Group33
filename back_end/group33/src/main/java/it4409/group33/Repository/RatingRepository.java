package it4409.group33.Repository;

import it4409.group33.Model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    boolean existsByUserIdAndProductIdAndOrderId(Long userId, Long productId, Long orderId);
    @Query("SELECT AVG(r.rate) FROM Rating r WHERE r.productId = :productId")
    double calculateAverageRatingByProductId(@Param("productId") Long productId);
    @Query("SELECT COUNT(r) FROM Rating r WHERE r.productId = :productId")
    int countRatingsByProductId(@Param("productId") Long productId);
    List<Rating> findByProductId(Long productId);
}
