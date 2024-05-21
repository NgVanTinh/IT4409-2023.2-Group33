package it4409.group33.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
public class CloudinaryController {

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

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        return uploadAndGetUrl(file);
    }
}

