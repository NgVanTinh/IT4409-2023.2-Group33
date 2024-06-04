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

    public static String genOTP(String email) {
        String hash = sha256(email + getTimeX());
        int length = hash.length();
        char secondLastChar = hash.charAt(length - 2);
        char lastChar = hash.charAt(length - 1);
        int asciiSecondLastChar = (int) secondLastChar;
        int asciiLastChar = (int) lastChar;
        return String.valueOf(asciiLastChar) + String.valueOf(asciiSecondLastChar);
    }
}
