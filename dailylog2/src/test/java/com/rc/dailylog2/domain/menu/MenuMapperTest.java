package com.rc.dailylog2.domain.menu;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MenuMapperTest {
    @Autowired
    private SqlSessionTemplate template;

    @Autowired
    private MenuMapper mapper;

    @Test
    public void  메뉴리스트_매퍼로가져오기(){
        //1. template 사용
        template.selectList("com.rc.dailylog.domain.menu.MenuMapper.selectAllMenu")
                .forEach(System.out::println);

        mapper.selectAllMenu()
                .forEach(System.out::println);

    }
}
