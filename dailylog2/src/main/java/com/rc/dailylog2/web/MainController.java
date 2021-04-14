package com.rc.dailylog2.web;

import com.rc.dailylog2.domain.dailylog.DailylogRepository;
import com.rc.dailylog2.service.dailylog.DailylogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class MainController {

    private final DailylogService dailylogService;
    private final DailylogRepository dailylogRepository;

    @GetMapping("/dailylog2")
    public String main(Model model){

        return "month-one";
    }
}
