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
    @GetMapping("/dailylog2/month/team")
    public String init(Model model){

        String userid = "2020001";
        String workingday = "2020-05-22";
        String deptcode = "00001";

        List<Dailylog> dailylogList = dailylogRepository.findByDeptcodeAndWorkingdayLike(deptcode,workingday);
        model.addAttribute("dailylogList",dailylogList);

        return "team";

    }
}
