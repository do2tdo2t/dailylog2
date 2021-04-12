package com.rc.dailylog2.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginResponseDto {
    String isLoginSuccess;

    @Builder
    public LoginResponseDto(String isLoginSuccess){
        this.isLoginSuccess = isLoginSuccess;
    }
}
