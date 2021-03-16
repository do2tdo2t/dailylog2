package com.rc.dailylog2.web;

import com.rc.dailylog2.domain.holiday.Holiday;
import com.rc.dailylog2.web.dto.HolidayRequestDto;
import org.junit.Test;
import org.junit.runner.Request;
import org.junit.runner.RunWith;
import org.junit.runner.Runner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HolidayControllerTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void 공휴일리스트_가져오기(){

        HolidayRequestDto requestDto = HolidayRequestDto
                                        .builder()
                                        .startday("2020-08-01")
                                        .endday("2020-08-31")
                                        .build();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HolidayRequestDto> request = new HttpEntity<>(requestDto,headers);

        String json = this.restTemplate.postForObject(
                "/api/search/holiday/month"
                , request
                ,String.class
        );

        System.out.println(json);
    }
}
