package com.rc.dailylog2.web;

import com.rc.dailylog2.service.dailylog.DailylogService;
import com.rc.dailylog2.web.dto.DailylogRequestDto;
import com.rc.dailylog2.web.dto.DailylogResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class DailylogApiController {

    private final DailylogService dailylogService;

    @PostMapping("/api/search/dailylog/one/month")
    public DailylogResponseDto getSearchDailylogOneMonthApi(@RequestBody DailylogRequestDto dailylogRequestDto){
        //session에서 가져오기 - userid

        DailylogResponseDto responseDto = dailylogService.getDailylogMonth(dailylogRequestDto);

        Map<String,Object> map = new HashMap<String, Object>();
        map.put("dto",responseDto);
        return responseDto;
    }

    @PostMapping("/api/search/dailylog/one/detail")
    public DailylogResponseDto getSearchDailylogOneDetailApi(@RequestBody DailylogRequestDto dailylogRequestDto, Model model){

        DailylogResponseDto responseDto = dailylogService.getDailylogDetail(dailylogRequestDto);

        Map<String,Object> map = new HashMap<String, Object>();
        map.put("dto",responseDto);
        model.addAttribute("dailylog",responseDto.getDailylog());

        return responseDto;
    }

    @PostMapping("/api/search/dailylog/team/week")
    public DailylogResponseDto getSearchDailylogTeamWeekApi(@RequestBody DailylogRequestDto dailylogRequestDto, Model model){

        DailylogResponseDto responseDto = dailylogService.getDailylogTeamWeek(dailylogRequestDto);

        //Map<String,Object> map = new HashMap<String, Object>();
        //map.put("dto",responseDto);

        //model.addAttribute("dailylog",responseDto.getDailylog());

        return responseDto;
    }
}
