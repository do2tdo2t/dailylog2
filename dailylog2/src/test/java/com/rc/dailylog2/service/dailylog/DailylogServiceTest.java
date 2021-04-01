package com.rc.dailylog2.service.dailylog;

import com.rc.dailylog2.domain.dailylog.Dailylog;
import com.rc.dailylog2.domain.dailylog.DailylogRepository;
import com.rc.dailylog2.domain.position.Position;
import com.rc.dailylog2.domain.position.PositionRepository;
import com.rc.dailylog2.domain.user.User;
import com.rc.dailylog2.domain.user.UserRepository;
import com.rc.dailylog2.web.dto.DailylogRequestDto;
import com.rc.dailylog2.web.dto.DailylogResponseDto;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DailylogServiceTest {
    @Autowired
    private DailylogService dailylogService;

    @Autowired
    private DailylogRepository dailylogRepository;

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void dbInit(){
        //Insert Position
        Position position = Position.builder()
                .positioncode("00005")
                .positionname("담당")
                .build();

        positionRepository.save(position);
        
        //Insert User
        User user = User.builder()
                .userid("R2019254")
                .username("박효정")
                .deptcode("00001")
                .acceptadminyn("N")
                .positioncode("00005")
                .build();
        userRepository.save(user);
    }
    
    
    @After
    public void cleanup(){
        dailylogRepository.deleteAll();
    }

    @Test
    public void getMonthDailylog(){
        //Insert
        DailylogRequestDto requestDto = DailylogRequestDto.builder()
                .dailylogno(new Long(1))
                .content1("[컨텐츠1]")
                .content2("[컨텐츠2]")
                .content3("[컨텐츠3]")
                .workingday("2020-05-01")
                .startdate("2020-05-01")
                .enddate("2020-05-30")
                .deptcode("00001")
                .userid("R2019254")
                .part("H")
                .build();

        Dailylog dailylog = requestDto.toEntity();
        dailylogRepository.save(dailylog);

        //select
        DailylogResponseDto responseDto  = dailylogService.getDailylogMonth(requestDto);
        Dailylog dailylog1 = responseDto.getDailylogList().get(0);

        //Test
        assertThat(dailylog1.getContent1()).isEqualTo(dailylog.getContent1());
        assertThat(dailylog1.getWorkerid()).isEqualTo(dailylog.getWorkerid());
        assertThat(dailylog1.getWorkingday()).isEqualTo(dailylog.getWorkingday());
        assertThat(dailylog1.getUser().getUsername()).isEqualTo("박효정");
    }

    @Test
    public void 팀업무일지상세가져오기(){

        //Insert
        DailylogRequestDto requestDto = DailylogRequestDto.builder()
                .workingday("2021-03-18")
                .deptcode("00001")
                .build();
        DailylogResponseDto responseDto = dailylogService.getTeamDaillogDetail(requestDto);

        responseDto.getDailylogList().forEach(System.out::println);

    }

}
