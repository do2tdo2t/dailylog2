package com.rc.dailylog2.domain.dailylog;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@ToString
@Getter
@NoArgsConstructor
@Entity
@Table(name="T_DAILYLOG_ACCEPT")
public class DailylogAccept implements Serializable {
    //복합키 사용으로 인한 Serializable 상속
    //sessions might be serialized in the session cache of a web application. Thats why it has to be serializable

    @Id
    private String deptcode;

    @Id
    private String workingday;


    private String enterid;


    private String entername;

    @Column(columnDefinition = "DATE default sysdate")
    private String enterdate;

    @Builder
    public DailylogAccept(
            String deptcode, String workingday
            , String enterid, String entername, String enterdate){
        this.deptcode = deptcode;
        this.workingday = workingday;
        this.enterdate = enterdate;
        this.enterid = enterid;
        this.entername = entername;
    }

}
