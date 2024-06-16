package it4409.group33.Repository;

import it4409.group33.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> findByStatus(Order.OrderStatus status);
    List<Order> findByUserIdAndStatus(Long userId, Order.OrderStatus status);
    @Query(value = "SELECT p.category, " +
            "SUM(JSON_UNQUOTE(JSON_EXTRACT(product_data, '$.quantity'))) AS total_quantity " +
            "FROM ( " +
            "   SELECT o.id, o.status, " +
            "   JSON_EXTRACT(product_json_array, CONCAT('$[', numbers.n, ']')) AS product_data " +
            "   FROM orders o " +
            "   CROSS JOIN ( " +
            "       SELECT 0 AS n UNION ALL " +
            "       SELECT 1 UNION ALL " +
            "       SELECT 2 UNION ALL " +
            "       SELECT 3 UNION ALL " +
            "       SELECT 4 UNION ALL " +
            "       SELECT 5 UNION ALL " +
            "       SELECT 6 UNION ALL " +
            "       SELECT 7 UNION ALL " +
            "       SELECT 8 UNION ALL " +
            "       SELECT 9 " +
            "   ) AS numbers " +
            "   WHERE numbers.n < JSON_LENGTH(product_json_array) " +
            "   AND o.status = 'COMPLETED' " +
            ") AS products_json " +
            "JOIN products p ON JSON_UNQUOTE(JSON_EXTRACT(products_json.product_data, '$.id')) = p.id " +
            "GROUP BY p.category",
            nativeQuery = true)
    List<Object[]> findTotalQuantityByCategory();
    @Query(value = "SELECT JSON_UNQUOTE(JSON_EXTRACT(product_data, '$.title')) AS title, " +
            "JSON_UNQUOTE(JSON_EXTRACT(product_data, '$.quantity')) AS quantity " +
            "FROM ( " +
            "   SELECT o.id, o.status, " +
            "   JSON_EXTRACT(product_json_array, CONCAT('$[', numbers.n, ']')) AS product_data " +
            "   FROM orders o " +
            "   CROSS JOIN ( " +
            "       SELECT 0 AS n UNION ALL " +
            "       SELECT 1 UNION ALL " +
            "       SELECT 2 UNION ALL " +
            "       SELECT 3 UNION ALL " +
            "       SELECT 4 UNION ALL " +
            "       SELECT 5 UNION ALL " +
            "       SELECT 6 UNION ALL " +
            "       SELECT 7 UNION ALL " +
            "       SELECT 8 UNION ALL " +
            "       SELECT 9 " +
            "   ) AS numbers " +
            "   WHERE numbers.n < JSON_LENGTH(product_json_array) " +
            "   AND o.status = 'COMPLETED' " +
            ") AS products_json " +
            "JOIN products p ON JSON_UNQUOTE(JSON_EXTRACT(products_json.product_data, '$.id')) = p.id " +
            "WHERE p.category = :category",
            nativeQuery = true)
    List<Object[]> findProductsByCategory(@Param("category") String category);
    @Query(value = "SELECT p.id AS product_id, " +
            "p.title AS product_title, " +
            "SUM(JSON_UNQUOTE(JSON_EXTRACT(product_data, '$.quantity'))) AS total_quantity_sold " +
            "FROM ( " +
            "   SELECT o.id, o.status, " +
            "   JSON_EXTRACT(product_json_array, CONCAT('$[', numbers.n, ']')) AS product_data " +
            "   FROM orders o " +
            "   CROSS JOIN ( " +
            "       SELECT 0 AS n UNION ALL " +
            "       SELECT 1 UNION ALL " +
            "       SELECT 2 UNION ALL " +
            "       SELECT 3 UNION ALL " +
            "       SELECT 4 UNION ALL " +
            "       SELECT 5 UNION ALL " +
            "       SELECT 6 UNION ALL " +
            "       SELECT 7 UNION ALL " +
            "       SELECT 8 UNION ALL " +
            "       SELECT 9 " +
            "   ) AS numbers " +
            "   WHERE numbers.n < JSON_LENGTH(product_json_array) " +
            "   AND o.status = 'COMPLETED' " +
            ") AS products_json " +
            "JOIN products p ON JSON_UNQUOTE(JSON_EXTRACT(products_json.product_data, '$.id')) = p.id " +
            "GROUP BY p.id, p.title " +
            "ORDER BY total_quantity_sold DESC",
            nativeQuery = true)
    List<Object[]> findProductsTotalQuantitySold();

    long count();

    @Query("SELECT SUM(o.total) FROM Order o WHERE o.status = 'COMPLETED'")
    Double sum();
}
