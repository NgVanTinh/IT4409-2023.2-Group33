package it4409.group33.Repository;

import it4409.group33.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT c.englishName, c.vietnameseName FROM Category c")
    List<Object[]> findAllEnglishName();

//    @Query("SELECT c.vietnameseName FROM Category c WHERE c.englishName = :englishName")
//    String findVietnameseNameByEnglishName(@Param("englishName") String englishName);
//
//    @Query("SELECT c.vietnameseName FROM Category c WHERE c.id = :id")
//    String findVietnameseNameById(@Param("englishName") Long id);
    @Query("SELECT c.id, c.vietnameseName FROM Category c")
    List<Object[]> findAllIdsAndVietnameseNames();
}
