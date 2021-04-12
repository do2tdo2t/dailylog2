package com.rc.dailylog2.service.dailylog;

import com.rc.dailylog2.service.login.LoginService;
import com.rc.dailylog2.web.dto.LoginRequestDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LoginServiceTest {

    @Autowired
    private LoginService loginService;

    @Test
    public void 로그인테스트(){
        String userid ="R2020001";
        String password = "test123";

        LoginRequestDto requestDto = LoginRequestDto.builder()
                                        .userid(userid)
                                        .password(password)
                                        .build();

        boolean result = loginService.checkLogin(requestDto);
        assertThat(result).isEqualTo(true);
    }
}
