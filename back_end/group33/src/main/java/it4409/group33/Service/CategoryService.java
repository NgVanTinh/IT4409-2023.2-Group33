package it4409.group33.Service;

import it4409.group33.Model.Category;
import it4409.group33.Repository.CategoryRepository;
import it4409.group33.Repository.ProductRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public String findAll() throws JSONException{
        List<Object[]> categories = categoryRepository.findAllIdsAndVietnameseNames();
        JSONArray jsonArray = new JSONArray();

        for (Object[] category : categories) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", category[0]);
            jsonObject.put("name", category[1]);
            jsonArray.put(jsonObject);
        }
        return jsonArray.toString();
    }


    public String getVietnameseNameById(Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        return categoryOptional.map(Category::getVietnameseName).orElse(null);
    }
}

