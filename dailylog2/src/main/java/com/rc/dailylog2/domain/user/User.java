package com.rc.dailylog2.domain.user;

import com.rc.dailylog2.domain.BaseTimeEntity;
import com.rc.dailylog2.domain.position.Position;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@ToString
@Getter
@NoArgsConstructor
@Entity
@Table(name="T_USER")
public class User extends BaseTimeEntity{

    @Id
    @Column(nullable = false) //PK auto_increment 속성
    private String userid;

    private String encpassword;

    @Column(nullable = false )
    private String username;

    private String deptcode;

    //@Column(nullable = false , columnDefinition="default 'H'")
    private String part;

    //@Column(nullable = false,  columnDefinition="default '0'")
    private String userstatecode;

    private String acceptadminyn;

    private String jumin1;

    private String jumin2;

    private String telnum;

    private String hpnum;

    private String email;

    @Column(columnDefinition = "DATE")
    private String logindate;

    private String loginip;

    //@Column(columnDefinition="default 0")
    private Integer logincount;

    //@Column(columnDefinition="default 0")
    private Integer loginfailcnt;

    //@Column(columnDefinition="default 'N'")
    private String lockyn;

    private String positioncode;

    @OneToOne
    @JoinColumn(name="positioncode", referencedColumnName = "positioncode", insertable = false, updatable = false)
    private Position position;

    private String enterid;

    private String entername;

    private String enterpgm;


    private String updateid;

    private String updatename;

    private String updatepgm;

    @Builder
    public User( String userid, String encpassword, String username, String deptcode, String part
                 , String userstatecode, String acceptadminyn, String jumin1
                 , String jumin2, String telnum, String hpnum, String email, String loginip
                 , String logindate, Integer logincount, Integer loginfailcnt, String lockyn
                 , String positioncode, Date enterdate, Date updatedate
                 , String enterid, String entername, String enterpgm
                 , String updateid, String updatename, String updatepgm) {
        this.userid = userid;
        this.username = username;
        this.deptcode = deptcode;
        this.encpassword = encpassword;
        this.part = part;
        this.userstatecode = userstatecode;
        this.acceptadminyn = acceptadminyn;
        this.jumin1 = jumin1;
        this.jumin2 = jumin2;
        this.telnum = telnum;
        this.hpnum = hpnum;
        this.email = email;
        this.logindate = logindate;
        this.logincount = logincount;
        this.loginfailcnt = loginfailcnt;
        this.loginip = loginip;
        this.lockyn = lockyn;
        this.positioncode = positioncode;
        this.enterid = enterid;
        this.entername = entername;
        this.enterpgm = enterpgm;
        this.updateid = updateid;
        this.updatename = updatename;
        this.updatepgm = updatepgm;
        this.enterdate = enterdate;
        this.updatedate = updatedate;

    }

    public void setUserid(String workerid) {
        this.userid = workerid;
    }
}
