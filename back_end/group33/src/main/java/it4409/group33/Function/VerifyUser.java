package it4409.group33.Function;

import it4409.group33.Model.User;
import it4409.group33.Repository.UserRepository;
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
        String otp=genOTP(toEmail);
        User user = userRepository.findByEmail(toEmail);
            if(user == null) {
                return "{\"code\":101,\"message\":\"Not found Account on DB\"}";
            } else {
                if(OTP.equals(otp)) {
                    userRepository.setActiveStatusByEmail(toEmail,1);
                    return "{\"code\":100,\"message\":\"Verify account completed\"}";
                } else {
                    return "{\"code\":102,\"message\":\"Wrong OTP, please try again\"}";
                }
            }
    }
}
