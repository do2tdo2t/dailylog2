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

    @GetMapping("/dailylog/dailylog2")
    public ModelAndView main(@RequestBody DailylogRequestDto dailylogRequestDto){
        ModelAndView modelAndView = new ModelAndView();

        DailylogResponseDto dto = dailylogService.getDailylogMonth(dailylogRequestDto);

        modelAndView.addObject("dailylogResponseDto",dto);
        modelAndView.addObject("dailylogResponseDto",dto);
        modelAndView.setViewName("main");

        return modelAndView;
    }
}
