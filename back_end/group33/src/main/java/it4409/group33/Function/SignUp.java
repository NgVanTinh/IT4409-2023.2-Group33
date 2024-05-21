package it4409.group33.Function;


import it4409.group33.Model.User;
import it4409.group33.Repository.UserRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static it4409.group33.Function.GenToken.genToken;
import static it4409.group33.Util.Hash.sha256;


@RestController
public class SignUp {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/v1/signup")
    public ResponseEntity<String> signUp(@RequestBody String requestBody) {
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
                        user = new User(jsonBody.getString("username"),
                                        sha256(jsonBody.getString("password")),
                                        jsonBody.getString("firstname"),
                                        jsonBody.getString("lastname"),
                                        jsonBody.getString("email"),
                                        jsonBody.getString("address"),
                                        jsonBody.getString("phone"),
                                        jsonBody.getString("role"),
                            0, 0);

                        userRepository.save(user);
                        response.put("message","Sign Up complete");
                        response.put("username",jsonBody.getString("username"));
                        response.put("token",genToken(jsonBody.getString("username"),sha256(jsonBody.getString("password"))));
                        response.put("firstName",jsonBody.getString("firstName"));
                        response.put("lastName",jsonBody.getString("lastname"));
                        return new ResponseEntity<>(response.toString(), HttpStatus.CREATED);
                    } else {
                        response.put("message","Invalid phone");
                    }
                } else {
                    response.put("message","Invalid Email");
                }
            } else {
                response.put("message","Invalid Username");
            }
            response.put("username","");
            response.put("token","");
            response.put("firstName","");
            response.put("lastName","");

        } catch (JSONException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response.toString(),HttpStatus.BAD_REQUEST);
    }
}
