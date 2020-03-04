package com.rc.dailylog2.domain.dailylog;

import com.rc.dailylog2.domain.user.User;
import com.rc.dailylog2.domain.user.UserRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
public class DailylogRepositoryTest {

    @Autowired
    private DailylogRepository dailylogRepository;

    @Autowired
    private UserRepository userRepository;

    //Test에서 변경한 데이터 롤백
    @After
    public void cleanup() {
        dailylogRepository.deleteAll();
    }

    @Test
    public void 개인별업무일지리스트_수정하기() throws Exception{
        User user = userRepository.findAll().get(0);


        String workerid = user.getUserid();
        String deptcode = user.getDeptcode();
        String part = "H";
        String startdate = "20/01/01";
        String enddate = "20/02/25";
        String workingday = "20/02/02";
        //String workingday = DateFormatUtil.stringToDate(workingdaystr,"yy/mm/dd");
        String content1 = "[프로그램 수정요청] 전산수정요청처리 10건";
        String content2 = "[회의] 회의 수행";


        //넣기
        dailylogRepository.save(Dailylog.builder()
                .workerid(workerid)
                .content1(content1)
                .content2(content2)
                .deptcode(deptcode)
                .workingday(workingday)
                .part(part)
                .build()
        );


        //한개 가져오기
        Dailylog dailylog = dailylogRepository.findByWorkeridAndWorkingdayLike(workerid,workingday);

        //수정
        dailylog.setContent1(content1);
        dailylog.setWorkingday(workingday);

        //다시 가져오기
        dailylog = dailylogRepository.findByWorkeridAndWorkingdayLike(workerid,workingday);

    }

    @Test
    public void 개인별업무일지리스트_가져오기() throws  Exception{
        User user = userRepository.findAll().get(0);

        String workerid = user.getUserid();
        String deptcode = user.getDeptcode();
        String part = "H";
        String startdate = "20/01/01";
        String enddate = "20/02/25";
        String workingday = "20/02/02";
        String content1 = "[프로그램 수정요청] 전산수정요청처리 10건";
        String content2 = "[회의] 회의 수행";


        //넣기
        dailylogRepository.save(Dailylog.builder()
                        .workerid(workerid)
                        .content1(content1)
                        .content2(content2)
                        .deptcode(deptcode)
                        .workingday(workingday)
                        .part(part)
                        .build()
        );

        //조회
        dailylogRepository.findListByWorkerid(workerid,startdate,enddate)
                .forEach(System.out::println);

    }

}
