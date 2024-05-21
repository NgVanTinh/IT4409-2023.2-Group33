package it4409.group33.Util;

import static it4409.group33.Util.Hash.sha256;

public class TimeStamp {
    public static long getTimestamp() {
        return System.currentTimeMillis();
    }
    public static String getTimeX() {
        long unixTimestamp = System.currentTimeMillis() / 1000;
        int result = (int) (unixTimestamp / 180) % 1000000;
        return String.valueOf(result);
    }
    public static String getTimeStamp() {
        long unixTimestamp = System.currentTimeMillis() / 1000;
        return String.valueOf(unixTimestamp);
    }
    public static String genOTP(String email) {
        String hash = sha256(email + getTimeX());
        String otp = hash.substring(0, 6);
        return otp;
    }
}
