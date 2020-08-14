package com.rc.dailylog2.web.dto;

import com.rc.dailylog2.domain.holiday.Holiday;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class HolidayResponseDto {
    private Holiday holiday;
    private List<Holiday> holidayList;

    @Builder
    public HolidayResponseDto(Holiday holiday, List<Holiday> holidayList){
        this.holiday = holiday;
        this.holidayList = holidayList;
    }

}
