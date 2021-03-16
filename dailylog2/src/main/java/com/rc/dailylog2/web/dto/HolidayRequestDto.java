package com.rc.dailylog2.web.dto;

import com.rc.dailylog2.domain.holiday.Holiday;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HolidayRequestDto {
    private Long holidayno;
    private String title;
    private String startday;
    private String endday;
    private String yyyy;

    @Builder
    public HolidayRequestDto(String title, String startday, String endday, String yyyy){
        this.title = title;
        this.endday = endday;
        this.startday = startday;
        this.yyyy = yyyy;
    }

    public Holiday toEntity(){
        return Holiday.builder()
                .endday(endday)
                .startday(startday)
                .title(title)
                .yyyy(yyyy)
                .build();
    }
}
