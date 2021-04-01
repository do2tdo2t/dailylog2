package com.rc.dailylog2.web;

import com.rc.dailylog2.domain.dailylog.Dailylog;
import com.rc.dailylog2.web.dto.DailylogRequestDto;
import com.rc.dailylog2.web.dto.DailylogResponseDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DailylogControllerTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void 팀업무일지상세보기(){
        DailylogRequestDto requestDto = DailylogRequestDto.builder().workingday("2021-03-18").deptcode("0001").build();

        DailylogResponseDto responseDto = this.restTemplate.postForObject("/api/search/dailylog/team/detail", requestDto ,DailylogResponseDto.class);
        for (Dailylog dailylog : responseDto.getDailylogList()) {
            System.out.println(dailylog.toString());
        }
    }
}
