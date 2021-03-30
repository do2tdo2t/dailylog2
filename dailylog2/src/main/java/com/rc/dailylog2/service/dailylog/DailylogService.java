package com.rc.dailylog2.service.dailylog;

import com.rc.dailylog2.domain.dailylog.Dailylog;
import com.rc.dailylog2.domain.dailylog.DailylogRepository;
import com.rc.dailylog2.web.dto.DailylogRequestDto;
import com.rc.dailylog2.web.dto.DailylogResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class DailylogService {
    private final DailylogRepository dailylogRepository;

    //detail
    public DailylogResponseDto getDailylogDetail(DailylogRequestDto requestDto){

        //Dailylog dailylog = dailylogRepository.findByWorkeridAndWorkingdayLike(requestDto.getUserid(),requestDto.getWorkingday());
        Dailylog dailylog = dailylogRepository.findByDailylogno(requestDto.getDailylogno());

        DailylogResponseDto responseDto = DailylogResponseDto.builder()
                .dailylog(dailylog)
                .build();

        return responseDto;
    }

    public DailylogResponseDto getDailylogList(DailylogRequestDto requestDto){

        List<Dailylog> dailylogList = dailylogRepository.
                findByWorkeridAndWorkingdayBetween(requestDto.getUserid(), requestDto.getStartdate(),requestDto.getEnddate());

        DailylogResponseDto responseDto = DailylogResponseDto.builder()
                //.dailylog(dailylog)
                .dailylogList(dailylogList)
                .build();

        return responseDto;
    }

    //dailylog monthly list
    public DailylogResponseDto getDailylogMonth(DailylogRequestDto requestDto){

        List<Dailylog> dailylogList = dailylogRepository.
                findByWorkeridAndWorkingdayBetween(requestDto.getUserid(), requestDto.getStartdate(),requestDto.getEnddate());

        //Dailylog dailylog = dailylogRepository.findByWorkeridAndWorkingday(requestDto.getUserid(), requestDto.getWorkingday());

        DailylogResponseDto responseDto = DailylogResponseDto.builder()
                //.dailylog(dailylog)
                .dailylogList(dailylogList)
                .build();

        return responseDto;
    }

    public DailylogResponseDto getDailylogTeamWeek(DailylogRequestDto requestDto){
        List<Dailylog> dailylogList = dailylogRepository.findByDeptcodeAndWorkingdayBetween(requestDto.getDeptcode(),requestDto.getStartdate(),requestDto.getEnddate());

        DailylogResponseDto responseDto = DailylogResponseDto.builder()
                .dailylogList(dailylogList)
                .build();

        return responseDto;
    }

    public DailylogResponseDto saveDailylog(DailylogRequestDto requestDto){
        Dailylog dailylog = requestDto.toEntity();

        Dailylog dailylogResult =  dailylogRepository.save(dailylog);

        DailylogResponseDto responseDto = DailylogResponseDto.builder()
                .dailylog(dailylogResult)
                .build();
        return responseDto;
    }

    public void deleteDailylog(DailylogRequestDto requestDto){
        Dailylog dailylog = Dailylog.builder().dailylogno(requestDto.getDailylogno()).build();

        dailylogRepository.delete(dailylog);

    }
}
