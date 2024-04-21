package it4409.group33.Function;

import it4409.group33.Model.User;
import it4409.group33.Repository.UserRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static it4409.group33.Util.TimeStamp.genOTP;

@RestController
public class VerifyUser {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("v1/verifyAccount")
    private String verifyAccount(@RequestParam String toEmail, @RequestParam String OTP) {
        JSONObject response = new JSONObject();
        String otp=genOTP(toEmail);
        User user = userRepository.findByEmail(toEmail);
        try {
            if(user == null) {
                response.put("code",101);
                response.put("message","Not found Account on DB");
            } else {
                if(OTP.equals(otp)) {
                    response.put("code",100);
                    response.put("message","Verify account completed");
                    userRepository.setActiveStatusByEmail(toEmail,1);
                } else {
                    response.put("code",102);
                    response.put("message","Wrong OTP, please try again");
                }
            }
            return response.toString();
        } catch (JSONException e) {
            e.printStackTrace();
            return "{\"code\":200,\"message\":\"Server exception\"}";
        }
    }
}
