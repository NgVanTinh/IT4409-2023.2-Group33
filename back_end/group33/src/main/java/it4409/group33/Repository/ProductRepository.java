package it4409.group33.Repository;

import it4409.group33.Model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
    List<Product> findByCategory(String category);
    List<Product> findByBrand(String brand);
    @Query("SELECT p FROM Product p WHERE p.id = :productId")
    Product findByProductId(long productId);
}

