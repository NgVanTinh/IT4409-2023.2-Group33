package it4409.group33.Function;


import it4409.group33.Util.EmailSender;
import jdk.jfr.Registered;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static it4409.group33.Util.TimeStamp.genOTP;

@RestController

public class GetOTP {
    @Autowired
    private EmailSender emailSender;

    @PostMapping("/v1/getOTP")
    public String getOTP(@RequestParam String toEmail) {
        String otp = genOTP(toEmail);
        String subject = "Active your account";
        String body = "This is your OTP: " + otp + ".\n The OTP with expire in 3 minutes" ;
        if (emailSender.sendEmail(toEmail, subject, body)) {
            return "{\"code\":100,\"message\":\"Sent OTP\"}";
        } else {
            return "{\"code\":101,\"message\":\"Sent OTP fail, please try again\"}";
        }
    }
}
