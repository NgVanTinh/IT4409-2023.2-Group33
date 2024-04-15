package it4409.group33.Function;

import it4409.group33.Model.User;
import it4409.group33.Repository.UserRepository;
import org.checkerframework.checker.units.qual.K;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static it4409.group33.Util.Hash.sha256;

@RestController
public class Login {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/v1/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        JSONObject response = new JSONObject();
        String message = "Server exception";
        int code = 200;
        if(username != null && password != null) {
            User dbUser = userRepository.findByUsername(username);
            if(dbUser == null) {
                message = "Không tồn tại username";
                code = 101;
            } else if (dbUser.getPassword().equals(sha256(password))) {
                message = "Đăng nhập thành công";
                code = 100;
            } else {
                message = "Sai mật khẩu";
                code = 102;
            }
        }

        try {
            response.put("code",code);
            response.put("message",message);
            return response.toString();
        } catch (JSONException e) {
            e.printStackTrace();
            return "{\"code\":200,\"message\":\"Server exception\"}";
        }
    }
}