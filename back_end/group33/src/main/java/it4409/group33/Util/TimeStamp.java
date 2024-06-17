package it4409.group33.Util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

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
        while(asciiSecondLastChar > 99) {
            asciiSecondLastChar -= 5;
        }
        while(asciiLastChar > 99) {
            asciiLastChar -= 5;
        }
        return String.valueOf(asciiLastChar) + String.valueOf(asciiSecondLastChar);
    }

    public static String getDate() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("UTC"));
        ZonedDateTime vietnamTime = now.atZone(ZoneId.of("UTC")).withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yy");
        return vietnamTime.format(formatter);
    }

    public static String getTime() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("UTC"));
        ZonedDateTime vietnamTime = now.atZone(ZoneId.of("UTC")).withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:MM:ss");
        return vietnamTime.format(formatter);
    }
}
