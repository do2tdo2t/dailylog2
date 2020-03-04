package com.rc.dailylog2.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateFormatUtil {
    public static String dateToString(Date date) {
        String str="";
        return str;
    }

    public static LocalDate stringToDate(String strdate, String format) throws ParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yy/mm/dd");

        LocalDate date = LocalDate.parse(strdate, formatter);

        return date;
    }
}
