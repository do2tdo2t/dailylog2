package com.rc.dailylog2.domain.dailylog;

import com.rc.dailylog2.domain.BaseTimeEntity;
import com.rc.dailylog2.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

@ToString
@Getter
@NoArgsConstructor
@Entity
@Table(name="T_DAILYLOG")
public class Dailylog extends BaseTimeEntity {
    @Id
    @SequenceGenerator(name="seq", sequenceName = "SEQ_T_DAILYLOG", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator="seq") //PK auto_increment 속성
    private Long dailylogno;

    @Column(nullable = false, columnDefinition="default ''")
    private String deptcode;

    // @OneToOne(fetch = FetchType.LAZY, cascade={CascadeType.ALL})
    @OneToOne
    @JoinColumn(name="workerid", referencedColumnName ="userid", insertable = false, updatable = false)
    private User user;

    @Column(nullable = false)
    private String workerid;

    @Column(name= "workingday" ,nullable = false , columnDefinition="DATE")
    private String workingday;

    @Column(nullable = false , columnDefinition="default 'H'")
    private String part;

    @Lob
    private String content1;

    @Lob
    private String content2;

    @Lob
    private String content3;

    @Lob
    private String content4;

    @Column(length=20)
    private String overtimestart;

    @Column(length=20)
    private String overtimeend;

    @Lob
    private String overtimecontent;

    private String tag;

    private String enterid;

    private String entername;

    private String enterpgm;

    private String updateid;

    private String updatename;

    private String updatepgm;

    @Builder
    public Dailylog(String deptcode, String workerid, String workingday, String part
    , String content1, String content2, String content3, String content4, String overtimestart,
                    String overtimeend, String overtimecontent, String tag,
                    String enterid, String entername, String enterpgm,
                     String updateid, String updatename, String updatepgm){
        this.deptcode = deptcode;
        this.workerid = workerid;
        this.workingday = workingday;
        this.part = part;
        this.content1 = content1;
        this.content2 = content2;
        this.content3 = content3;
        this.content4 = content4;
        this.overtimeend = overtimeend;
        this.overtimestart = overtimestart;
        this.overtimecontent = overtimecontent;
        this.tag = tag;
        this.enterid = enterid;
        this.entername = entername;
        this.enterpgm = enterpgm;
        this.updateid = updateid;
        this.updatename = updatename;
        this.updatepgm = updatepgm;
    }

    public void setContent1(String content1) {
        this.content1 = content1;
    }

    public void setContent2(String content2){
        this.content2 = content2;
    }

    public void setWorkingday(String workingday){
        this.workingday = workingday;
    }

    //Entity 영속성에 의해
    //조건을 적용할 필요 없이 update 수행
    public void update(
            String workingday
            , String content1, String content2, String content3, String content4,
            String overtimestart, String overtimeend, String overtimecontent, String tag,
            String updateid, String updatename, String updatepgm){
        this.workingday = workingday;
        this.content1 = content1;
        this.content2 = content2;
        this.content3 = content3;
        this.content4 = content4;
        this.overtimeend = overtimeend;
        this.overtimestart = overtimestart;
        this.overtimecontent = overtimecontent;
        this.tag = tag;
        this.updateid = updateid;
        this.updatename = updatename;
        this.updatepgm = updatepgm;
    }

}
