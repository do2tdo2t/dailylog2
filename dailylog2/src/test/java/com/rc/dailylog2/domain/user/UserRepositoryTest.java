package com.rc.dailylog2.domain.user;


import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @After
    public void cleanup() {
        userRepository.deleteAll();
    }

    @Test
    public void 유저추가(){
        String userid = "R2020003";
        String username = "이아무개";
        String deptcode = "601008002000";
        String part = "H";
        String userstatecode = "0";
        String acceptadminyn = "N";


        userRepository.save (
                User.builder()
                        .userid(userid)
                        .username(username)
                        .deptcode(deptcode)
                        .part(part)
                        .userstatecode(userstatecode)
                        .acceptadminyn(acceptadminyn)
                        .build());


        userRepository.findAll()
                .forEach(System.out::println);


    }
}
