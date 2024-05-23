package it4409.group33.Function;

import it4409.group33.Model.User;
import it4409.group33.Repository.UserRepository;
import it4409.group33.Util.JWT;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static it4409.group33.Util.Hash.sha256;

@RestController
@RequestMapping("/auth")
public class Auth {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<String> auth(@RequestBody Map<String, String> requestBody) {
        String username = requestBody.get("username");
        String password = requestBody.get("password");

        User user = userRepository.findByUsername(username);
        if (user == null || !user.getPassword().equals(sha256(password))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        String jwtToken = JWT.createJWT(String.valueOf(user.getId()),user.getUsername() ,user.getRole());

        JSONObject response = new JSONObject();
        try {
            response.put("token", jwtToken);
            response.put("id",String.valueOf(user.getId()));
            response.put("username",username);
            response.put("role",user.getRole());
            return ResponseEntity.ok(response.toString());
        } catch (JSONException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<String> currentAuthUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) {
        if(JWT.validateJWT(jwt)) {
            String payload = JWT.getPayload(jwt);
            JSONObject payloadJSON = null;
            JSONObject response = new JSONObject();
            try {
                payloadJSON = new JSONObject(payload);
                response.put("username",payloadJSON.get("userName"));
                response.put("role",payloadJSON.get("role"));
                response.put("id",payloadJSON.get("userId"));
                return new ResponseEntity<>(response.toString(),HttpStatus.OK);
            } catch (JSONException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
            }


        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> refreshToken(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) {
        if(JWT.validateJWT(jwt)) {
            String payload = JWT.getPayload(jwt);
            JSONObject payloadJSON = null;
            JSONObject response = new JSONObject();
            try {
                payloadJSON = new JSONObject(payload);
                response.put("username",payloadJSON.get("userName"));
                response.put("role",payloadJSON.get("role"));
                response.put("id",payloadJSON.get("userId"));
                String newJWT = JWT.createJWT(payloadJSON.getString("userId"),payloadJSON.getString("userName"),payloadJSON.getString("role"));
                response.put("token",newJWT);
                return new ResponseEntity<>(response.toString(),HttpStatus.OK);
            } catch (JSONException e) {
                e.printStackTrace();
                return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
            }


        } else {
            return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
        }

    }
}
