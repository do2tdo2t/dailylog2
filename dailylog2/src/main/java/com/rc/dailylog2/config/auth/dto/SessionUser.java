package com.rc.dailylog2.config.auth.dto;

import com.rc.dailylog2.domain.user.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private String userid;
    private String username;
    private String gmail;
    private String email;
    private String deptcode;

    public SessionUser(User user){
        this.userid = user.getUserid();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.gmail = user.getGmail();
        this.deptcode = user.getDeptcode();
    }
}
