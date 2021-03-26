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
    private String userid; // workerid
    private String workerid;
    private String deptcode;
    private String startdate;
    private String enddate;
    private String part;
    private String content1 = "";
    private String content2 = "";
    private String content3 = "";
    private String content4 = "";
    private String overtimestart = "";
    private String overtimeend = "";
    private String overtimecontent = "";
    private String tag;

    @Builder
    public DailylogRequestDto(Long dailylogno , String workingday, String userid, String workerid,
                              String deptcode, String part, String content1
                            , String content2, String content3, String content4
                            , String overtimestart, String overtimeend, String overtimecontent
                            , String tag, String startdate , String enddate){
        this.dailylogno = dailylogno;
        this.workingday = workingday;
        this.workerid = workerid;
        this.userid = userid;
        this.deptcode = deptcode;
        this.content1 = content1;
        this.content2 = content2;
        this.content3 = content3;
        this.content4 = content4;
        this.overtimecontent = overtimecontent;
        this.overtimestart = overtimestart;
        this.overtimeend = overtimeend;
        this.part = part;
        this.tag = tag;
        this.startdate = startdate;
        this.enddate = enddate;
    }

    public Dailylog toEntity(){
        return Dailylog.builder()
                .dailylogno(dailylogno)
                .workingday(workingday)
                .workerid(workerid)
                .deptcode(deptcode)
                .content1(content1)
                .content2(content2)
                .content3(content3)
                .content4(content4)
                .overtimestart(overtimestart)
                .overtimeend(overtimeend)
                .overtimecontent(overtimecontent)
                .tag(tag)
                .part(part)
                .build();
    }
}
