package com.rc.dailylog2.service.login;

import com.rc.dailylog2.domain.login.LoginRepository;
import com.rc.dailylog2.util.Sha256Util;
import com.rc.dailylog2.web.dto.LoginRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rc.dailylog2.domain.login.LoginMapper;

import java.util.HashMap;

@RequiredArgsConstructor
@Service
public class LoginService {

   // @Autowired
   // LoginMapper loginMapper;

    @Autowired
    LoginRepository loginRepository;

    public boolean checkLogin(LoginRequestDto requestDto){

       // HashMap<String,Object> hashMap = new HashMap<>();
       // hashMap.put("userid",requestDto.getUserid());
       // hashMap.put("password", Sha256Util.encrypt(requestDto.getPassword()));
        System.out.println(Sha256Util.encrypt(requestDto.getPassword()));

        return loginRepository.existsByUseridAndEncpassword(requestDto.getUserid(),Sha256Util.encrypt(requestDto.getPassword()));
    }

}
