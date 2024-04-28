package it4409.group33.Function;


import it4409.group33.Model.User;
import it4409.group33.Repository.UserRepository;
import it4409.group33.Util.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static it4409.group33.Util.TimeStamp.genOTP;

@RestController

public class GetOTP {
    @Autowired
    private EmailSender emailSender;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/v1/getOTP")
    public String getOTP(@RequestParam String toEmail) {
        User user = userRepository.findByEmail(toEmail);
        if(user != null) {
            String otp = genOTP(toEmail);
            String subject = "Active your account";
            String body = "This is your OTP: " + otp + ".\n The OTP with expire in 3 minutes" ;
            if (emailSender.sendEmail(toEmail, subject, body)) {
                return "{\"code\":100,\"message\":\"Sent OTP\"}";
            } else {
                return "{\"code\":101,\"message\":\"Sent OTP fail, please try again\"}";
            }
        } else {
            return "{\"code\":102,\"message\":\"Email not found\"}";
        }
    }
}
