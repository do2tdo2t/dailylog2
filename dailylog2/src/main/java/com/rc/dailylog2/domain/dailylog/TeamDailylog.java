package com.rc.dailylog2.domain.dailylog;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@ToString
@Getter
@NoArgsConstructor
public class TeamDailylog {
    private String username;
    private String workingday;
    private String deptcode;

    @Builder
    public TeamDailylog(String username, String workingday, String deptcode){
        this.username = username;
        this.workingday = workingday;
        this.deptcode = deptcode;
    }

}
