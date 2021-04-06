package com.rc.dailylog2.web;

import com.rc.dailylog2.domain.dailylog.Dailylog;
import com.rc.dailylog2.service.dailylog.DailylogService;
import com.rc.dailylog2.web.dto.DailylogRequestDto;
import com.rc.dailylog2.web.dto.DailylogResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class DailylogApiController {

    private final DailylogService dailylogService;

    @PostMapping("/api/search/dailylog/one/month")
    public DailylogResponseDto getDailylogOneMonthApi(@RequestBody DailylogRequestDto dailylogRequestDto){

        DailylogResponseDto responseDto = dailylogService.getDailylogMonth(dailylogRequestDto);

        return responseDto;
    }

    @PostMapping("/api/search/dailylog/team/month")
    public DailylogResponseDto getDailylogTeamMonthApi(@RequestBody DailylogRequestDto dailylogRequestDto){

        DailylogResponseDto responseDto = dailylogService.getDailylogTeamMonth(dailylogRequestDto);

        return responseDto;
    }

    @PostMapping("/api/search/dailylog/one/week")
    public DailylogResponseDto getSearchDailylogOneWeekApi(@RequestBody DailylogRequestDto dailylogRequestDto){

        DailylogResponseDto responseDto = dailylogService.getDailylogList(dailylogRequestDto);

        return responseDto;
    }


    @PostMapping("/api/search/dailylog/one/detail")
    public DailylogResponseDto getSearchDailylogOneDetailApi(@RequestBody DailylogRequestDto dailylogRequestDto){

        DailylogResponseDto responseDto = dailylogService.getDailylogDetail(dailylogRequestDto);


        return responseDto;
    }

    @PostMapping("/api/search/dailylog/team/detail")
    public DailylogResponseDto getSearchDailylogTeamDetailApi(@RequestBody DailylogRequestDto dailylogRequestDto){

        DailylogResponseDto responseDto = dailylogService.getTeamDaillogDetail(dailylogRequestDto);

        //model.addAttribute("dailylogList", responseDto.getDailylogList());

        return responseDto;
    }


    @PostMapping("/api/search/dailylog/team/week")
    public DailylogResponseDto getSearchDailylogTeamWeekApi(@RequestBody DailylogRequestDto dailylogRequestDto){

        DailylogResponseDto responseDto = dailylogService.getDailylogTeamWeek(dailylogRequestDto);


        return responseDto;
    }

    @PutMapping("/api/dailylog")
    public DailylogResponseDto saveDailyslogApi(@RequestBody DailylogRequestDto dailylogRequestDto){
        DailylogResponseDto responseDto = dailylogService.saveDailylog(dailylogRequestDto);
        return responseDto;
    }

    @DeleteMapping("/api/dailylog")
    public DailylogResponseDto deleteDailylogApi(@RequestBody DailylogRequestDto dailylogRequestDto){
        DailylogResponseDto responseDto = DailylogResponseDto.builder()
                                            .workingday(dailylogRequestDto.getWorkingday()).build();

        dailylogService.deleteDailylog(dailylogRequestDto);

        return responseDto;
    }
}
