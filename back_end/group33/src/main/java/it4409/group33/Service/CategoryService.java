package it4409.group33.Service;

import it4409.group33.Model.Category;
import it4409.group33.Repository.CategoryRepository;
import it4409.group33.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Object[]> findAll() {
        return categoryRepository.findAllIdsAndVietnameseNames();
    }

    public String getVietnameseNameById(Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        return categoryOptional.map(Category::getVietnameseName).orElse(null);
    }
}

