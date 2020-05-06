package com.rc.dailylog2.domain.weeklylog;

import com.rc.dailylog2.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@ToString
@Getter
@NoArgsConstructor
@Entity
@Table(name="T_WEEKLYLOG")
public class Weeklylog extends BaseTimeEntity implements Serializable {
    @Id
    @SequenceGenerator(name="seq", sequenceName = "SEQ_T_WEEKLYLOG", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator="seq") //PK auto_increment 속성
    private Long weeklylogno;

    //@Column(nullable = false, columnDefinition = "default ''")
    private String deptcode;

    //@Column(nullable = false, columnDefinition = "default ''")
    private String workerid;

    //@Column(columnDefinition = "DATE default sysdate", nullable = false)
    private String workingday;

    //@Column(nullable = false, columnDefinition = "default 'H'")
    private String part;

    @Lob
    private String content1;

    @Lob
    private String content2;

    @Lob
    private String content3;

    @Lob
    private String content4;

    private String tag;

    private String enterid;

    private String entername;

    private String enterpgm;

    private String updateid;

    private String updatename;

    private String updatepgm;

    @Builder
    public Weeklylog(String deptcode, String workerid, String workingday, String part
            , String content1, String content2, String content3, String content4, String tag,
                     String enterid, String entername, String enterpgm,
                     String updateid, String updatename, String updatepgm) {
        this.deptcode = deptcode;
        this.workerid = workerid;
        this.workingday = workingday;
        this.part = part;
        this.content1 = content1;
        this.content2 = content2;
        this.content3 = content3;
        this.content4 = content4;
        this.tag = tag;
        this.enterid = enterid;
        this.entername = entername;
        this.enterpgm = enterpgm;
        this.updateid = updateid;
        this.updatename = updatename;
        this.updatepgm = updatepgm;
    }

    public void update(String deptcode, String workerid, String workingday, String part
            , String content1, String content2, String content3, String content4, String tag,
                       String enterid, String entername, String enterpgm,
                       String updateid, String updatename, String updatepgm) {
        this.deptcode = deptcode;
        this.workerid = workerid;
        this.workingday = workingday;
        this.part = part;
        this.content1 = content1;
        this.content2 = content2;
        this.content3 = content3;
        this.content4 = content4;
        this.tag = tag;
        this.enterid = enterid;
        this.entername = entername;
        this.enterpgm = enterpgm;
        this.updateid = updateid;
        this.updatename = updatename;
        this.updatepgm = updatepgm;
    }

}
