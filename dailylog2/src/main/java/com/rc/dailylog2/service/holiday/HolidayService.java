package com.rc.dailylog2.service.holiday;


import com.rc.dailylog2.domain.holiday.Holiday;
import com.rc.dailylog2.domain.holiday.HolidayRepository;
import com.rc.dailylog2.web.dto.HolidayRequestDto;
import com.rc.dailylog2.web.dto.HolidayResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class HolidayService {
    private final HolidayRepository holidayRepository;

    public HolidayResponseDto getHoliday(HolidayRequestDto requestDto){

        List<Holiday> holidayList = holidayRepository.findByStartdayGreaterThanEqualAndEnddayLessThanEqual(
                requestDto.getStartday(),requestDto.getEndday()
        );

        HolidayResponseDto responseDto = HolidayResponseDto.builder()
                                            .holidayList(holidayList)
                                            .build();
        return responseDto;
    }

}
