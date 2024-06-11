package it4409.group33.Controller;

import it4409.group33.Model.User;
import it4409.group33.Repository.UserRepository;
import it4409.group33.Util.EmailSender;
import it4409.group33.Util.JWT;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static it4409.group33.Util.Hash.sha256;
import static it4409.group33.Util.TimeStamp.genOTP;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailSender emailSender;

    @PostMapping("/auth/login")
    public ResponseEntity<String> auth(@RequestBody Map<String, String> requestBody) {
        String username = requestBody.get("username");
        String password = requestBody.get("password");

        User user = userRepository.findByUsername(username);
        if (user == null || !user.getPassword().equals(sha256(password))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        if(!user.isActived()) {
            return new ResponseEntity<>("Account is not actived",HttpStatus.FORBIDDEN);
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

    @GetMapping("/auth/me")
    public ResponseEntity<String> currentAuthUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) {
        if(JWT.validateJWT(jwt)) {
            String payload = JWT.getPayload(jwt);
            JSONObject payloadJSON;
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

    @PostMapping("/auth/refresh")
    public ResponseEntity<String> refreshToken(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) {
        if(JWT.validateJWT(jwt)) {
            String payload = JWT.getPayload(jwt);
            JSONObject payloadJSON;
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

    @PostMapping("/users/forgot-password")
    public ResponseEntity<String> getOTP(@RequestBody String rbody) {
        String toEmail = null;
        try {
            JSONObject req = new JSONObject(rbody);
            toEmail = req.getString("email");
        } catch (JSONException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(toEmail == null) {
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }

        User user = userRepository.findByEmail(toEmail);
        if(user != null) {
            String otp = genOTP(toEmail);
            String subject = "Reset your password";
            String body = "This is your OTP: " + otp + ".\n The OTP with expire in 3 minutes" ;
            if (emailSender.sendEmail(toEmail, subject, body)) {
                return new ResponseEntity<>("OTP has been sent to your email", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Fail, try again",HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/users/reset-password")
    private ResponseEntity<String> verifyAccount(@RequestBody String requestBody) {
        String toEmail = null;
        String OTP = null;
        String newPassword = null;
        try {
            JSONObject req = new JSONObject(requestBody);
            toEmail = req.getString("email");
            Long OTPLong = req.getLong("otp");
            OTP = String.valueOf(OTPLong);
            newPassword = req.getString("password");
        } catch (JSONException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(toEmail == null || OTP == null || newPassword == null) {
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }


        String otp = genOTP(toEmail);
        User user = userRepository.findByEmail(toEmail);
        if(user == null) {
            return new ResponseEntity<>("User not exist", HttpStatus.NOT_FOUND);
        } else {
            if(OTP.equals(otp)) {
                user.setPassword(sha256(newPassword));
                userRepository.save(user);
                String jwtToken = JWT.createJWT(String.valueOf(user.getId()),user.getUsername() ,user.getRole());
                JSONObject response = new JSONObject();
                try {
                    response.put("token", jwtToken);
                    response.put("id",String.valueOf(user.getId()));
                    response.put("username",user.getUsername());
                    response.put("role",user.getRole());
                    return ResponseEntity.ok(response.toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
                }
            } else {
                return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
            }
        }
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<String> signUp(@RequestBody String requestBody) {
        JSONObject jsonBody;
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
                                jsonBody.getString("fullname"),
                                jsonBody.getString("email"),
                                jsonBody.getString("phone"),
                                jsonBody.getString("address"));

                        userRepository.save(user);
                        response.put("id",user.getId());
                        response.put("message","Sign Up complete");
                        response.put("username",jsonBody.getString("username"));
                        response.put("fullname",jsonBody.getString("fullname"));
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
        } catch (JSONException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response.toString(),HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getAllUser() {
        List<Object[]> users = userRepository.getAllUsersExceptPassword();

        List<Map<String, Object>> userDicts = new ArrayList<>();
        for (Object[] user : users) {
            Map<String, Object> userDict = new HashMap<>();
            userDict.put("id", user[0]);
            userDict.put("address", user[1]);
            userDict.put("email", user[2]);
            userDict.put("name", user[3]);
            userDict.put("phone", user[4]);
            userDict.put("role", user[5]);
            userDict.put("username", user[6]);
            userDicts.add(userDict);
        }
        return new ResponseEntity<>(userDicts,HttpStatus.OK);
    }

}
