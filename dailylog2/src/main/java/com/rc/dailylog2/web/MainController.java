package com.rc.dailylog2.web;

import com.rc.dailylog2.domain.dailylog.Dailylog;
import com.rc.dailylog2.domain.dailylog.DailylogRepository;
import com.rc.dailylog2.service.dailylog.DailylogService;
import com.rc.dailylog2.web.dto.DailylogRequestDto;
import com.rc.dailylog2.web.dto.DailylogResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.ModelAndView;

@RequiredArgsConstructor
@Controller
public class MainController {

    private final DailylogService dailylogService;
    private final DailylogRepository dailylogRepository;

    @GetMapping("/dailylog2")
    public String main(Model model){
        //1. login 분기

        String userid = "2020001";
        String workingday = "2020-05-06";

        //2. Session 세팅
        Dailylog dailylog = dailylogRepository.findByWorkeridAndWorkingday(userid,workingday);
        model.addAttribute("dailylog",dailylog);

        return "main";
    }
}
