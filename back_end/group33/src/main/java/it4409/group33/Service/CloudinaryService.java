package it4409.group33.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public class CloudinaryService {

    private static Cloudinary cloudinary;

    public static String uploadAndGetUrl(MultipartFile file) {
        try {
            if (cloudinary == null) {
                cloudinary = new Cloudinary(ObjectUtils.asMap(
                        "cloud_name", "dmqtuqtj6",
                        "api_key", "759539686196424",
                        "api_secret", "0IIXvTeeUkSwbjqkKFqtewvO-GA"));
            }
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return (String) uploadResult.get("url");
        } catch (IOException e) {
            e.printStackTrace();
            return "Upload failed";
        }
    }

    public static String combineImageAndColor(MultipartFile file, String color){
        String image = uploadAndGetUrl(file);
        if(image.equals("Upload failed")) {
            return "Upload failed";
        }
        try {
            JSONObject res = new JSONObject();
            res.put("color",color);
            res.put("image",image);
            return res.toString();
        } catch (JSONException e) {
            e.printStackTrace();
            return "Upload failed";
        }

    }

}

