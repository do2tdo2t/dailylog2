package com.rc.dailylog2.web.dto;

import com.rc.dailylog2.domain.dailylog.Dailylog;
import com.rc.dailylog2.domain.dailylog.TeamDailylog;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class DailylogResponseDto {
    private Dailylog dailylog;
    private List<Dailylog> dailylogList;
    private List<TeamDailylog> teamDailylogList;
    private String workingday;


    @Builder
    public DailylogResponseDto(Dailylog dailylog, List<Dailylog> dailylogList, List<TeamDailylog> teamDailylogList, String workingday){
        this.dailylog = dailylog;
        this.dailylogList = dailylogList;
        this.teamDailylogList = teamDailylogList;
        this.workingday = workingday;
    }

}
