package it4409.group33.Function;


import it4409.group33.Model.User;
import it4409.group33.Repository.UserRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static it4409.group33.Util.Hash.sha256;


@RestController
public class SignUp {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/v1/signup")
    public String signUp(@RequestBody String requestBody) {
        JSONObject jsonBody = null;
        User user;
        JSONObject response = new JSONObject();

        try {
            jsonBody = new JSONObject(requestBody);
            user = userRepository.findByUsername(jsonBody.getString("username"));

            if(user == null) {
                user = userRepository.findByEmail(jsonBody.getString("email"));

                if(user == null) {
                    user = userRepository.findByPhone(jsonBody.getString("phone"));

                    if(user == null) {
                        user = new User(
                            jsonBody.getString("username"),
                            sha256(jsonBody.getString("password")),
                            jsonBody.getString("email"),
                            jsonBody.getString("address"),
                            jsonBody.getString("phone"),
                            jsonBody.getString("role"),
                            0);
                        userRepository.save(user);

                        response.put("code",100);
                        response.put("message","Đăng ký thành công");
                    } else {
                        response.put("code",102);
                        response.put("message","Số điện thoại đã tồn tại");
                    }
                } else {
                    response.put("code",103);
                    response.put("message","Email đã tồn tại");
                }
            } else {
                response.put("code",101);
                response.put("message","User name đã tồn tại");
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return "{\"code\":200,\"message\":\"Server exception\"}";
        }
        return response.toString();
    }
}
