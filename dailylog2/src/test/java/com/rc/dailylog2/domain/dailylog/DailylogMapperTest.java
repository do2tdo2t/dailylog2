package com.rc.dailylog2.domain.dailylog;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DailylogMapperTest {
    @Autowired
    private SqlSessionTemplate template;

    @Autowired
    private DailylogMapper mapper;

    @Test
    public void  팀업무일지상세가져오기(){
        //1. template 사용
        //template.selectList("com.rc.dailylog.domain.menu.MenuMapper.selectAllMenu")
        //        .forEach(Syst
        //        em.out::println);

        HashMap<String,Object> params = new HashMap<>();

        String workingday = "2020-03-05";
        String deptcode = "00001";

        Dailylog dailylog = Dailylog.builder()
                    .workingday(workingday)
                    .deptcode(deptcode)
                    .build();
        params.put("dailylog",dailylog);

        //mapper 사용
        mapper.selectTeamDailylogDetail(params)
                .forEach(System.out::println);
    }

    @Test
    public void  팀업무일지가져오기(){
        //1. template 사용
        //template.selectList("com.rc.dailylog.domain.menu.MenuMapper.selectAllMenu")
        //        .forEach(System.out::println);

        HashMap<String,Object> params = new HashMap<>();

        String deptcode = "00001";
        params.put("deptcode",deptcode);
        params.put("startdate","2021-03-01");
        params.put("enddate","2021-03-31");

        //mapper 사용
        mapper.selectTeamDailylogDetail(params)
                .forEach(System.out::println);
    }



}
