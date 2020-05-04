package com.rc.dailylog2.web.dto;

import com.rc.dailylog2.domain.dailylog.Dailylog;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DailylogRequestDto {
    private Long dailylogno;
    private String workingday;
    private String userid;
    private String deptcode;
    private String startdate;
    private String enddate;

    @Builder
    public DailylogRequestDto(Long dailylogno , String workingday, String userid, String deptcode){
        this.dailylogno = dailylogno;
        this.workingday = workingday;
        this.userid = userid;
        this.deptcode = deptcode;
    }

    public Dailylog toEntity(){
        return Dailylog.builder()
                .dailylogno(dailylogno)
                .workingday(workingday)
                .workerid(userid)
                .deptcode(deptcode)
                .build();
    }
}
