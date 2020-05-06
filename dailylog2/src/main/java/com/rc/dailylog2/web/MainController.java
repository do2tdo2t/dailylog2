package com.rc.dailylog2.web;

import com.rc.dailylog2.service.dailylog.DailylogService;
import com.rc.dailylog2.web.dto.DailylogRequestDto;
import com.rc.dailylog2.web.dto.DailylogResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.ModelAndView;

@RequiredArgsConstructor
@Controller
public class MainController {

    private final DailylogService dailylogService;

    @GetMapping("/dailylog2")
    public String main(){
        //1. login 분기
        
        //2. Session 세팅

        return "main";
    }
}
