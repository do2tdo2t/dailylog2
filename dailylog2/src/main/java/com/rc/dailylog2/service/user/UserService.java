package com.rc.dailylog2.service.user;

import com.rc.dailylog2.domain.user.User;
import com.rc.dailylog2.domain.user.UserMapper;
import com.rc.dailylog2.web.dto.LoginRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@RequiredArgsConstructor
@Service
public class UserService {

    @Autowired
    UserMapper usermapper;

    public User selectUser(LoginRequestDto requestDto){

        HashMap<String,Object> hashMap = new HashMap<>();
        hashMap.put("userid",requestDto.getUserid());

        return usermapper.selectUser(hashMap);
    }

}
