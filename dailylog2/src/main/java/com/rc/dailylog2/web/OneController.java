package com.rc.dailylog2.web;

import com.rc.dailylog2.domain.dailylog.Dailylog;
import com.rc.dailylog2.domain.dailylog.DailylogRepository;
import com.rc.dailylog2.domain.user.User;
import com.rc.dailylog2.service.dailylog.DailylogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Controller
public class OneController {

    private final DailylogService dailylogService;
    private final DailylogRepository dailylogRepository;

    @GetMapping("/dailylog2/one/month")
    public String main(Model model){

        return "month-one";
    }

    @GetMapping("/dailylog2/one/week")
    public String week(Model model){

        return "week-one";
    }

}
