package com.rc.dailylog2.web;

import com.rc.dailylog2.service.holiday.HolidayService;
import com.rc.dailylog2.web.dto.HolidayRequestDto;
import com.rc.dailylog2.web.dto.HolidayResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class HolidayApiController {
    private final HolidayService holidayService;

    @PostMapping("/api/search/holiday/month")
    public HolidayResponseDto getHolidayMonthApi(@RequestBody HolidayRequestDto holidayRequestDto){

        HolidayResponseDto responseDto = holidayService.getHoliday(holidayRequestDto);

        Map<String,Object> map = new HashMap<String, Object>();
        map.put("dto",responseDto);
        return responseDto;
    }
}
