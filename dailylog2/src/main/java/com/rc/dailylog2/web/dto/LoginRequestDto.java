package com.rc.dailylog2.web.dto;

import lombok.*;

/* @ModelAttribut 객체로 사용하기 위해서 Setter 함수가 필요하다. */
@Getter
@Setter
@ToString
@NoArgsConstructor
public class LoginRequestDto {
    private String userid;
    private String password;

    @Builder
    public LoginRequestDto(String userid, String password) {
        this.userid = userid;
        this.password = password;
    }
}
