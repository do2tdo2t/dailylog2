package com.rc.dailylog2.web;

import com.rc.dailylog2.domain.dailylog.Dailylog;
import com.rc.dailylog2.domain.dailylog.DailylogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class TeamController {

    private final DailylogRepository dailylogRepository;

    //팀 업무일지 첫화면
    @GetMapping("/dailylog2/team/month")
    public String monthTeam(){

        return "month-team";

    }

    //팀 업무일지 첫화면
    @GetMapping("/dailylog2/team/week")
    public String weekTeam(){

        return "week-team";

    }

}
