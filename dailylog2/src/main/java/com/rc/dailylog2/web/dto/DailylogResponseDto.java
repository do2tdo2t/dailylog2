package com.rc.dailylog2.web.dto;

import com.rc.dailylog2.domain.dailylog.Dailylog;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class DailylogResponseDto {
    private Dailylog dailylog;
    private List<Dailylog> dailylogList;

    @Builder
    public DailylogResponseDto(Dailylog dailylog, List<Dailylog> dailylogList){
        this.dailylog = dailylog;
        this.dailylogList = dailylogList;
    }

}
