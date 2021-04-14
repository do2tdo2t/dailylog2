package com.rc.dailylog2.web;


import com.rc.dailylog2.domain.user.User;
import com.rc.dailylog2.service.login.LoginService;
import com.rc.dailylog2.service.user.UserService;
import com.rc.dailylog2.web.dto.LoginRequestDto;
import com.rc.dailylog2.web.dto.LoginResponseDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.io.IOException;

@RequiredArgsConstructor
@Controller
public class LoginController {

    private static Logger logger = (Logger) LoggerFactory.getLogger(LoginController.class.getName());

    @Autowired
    LoginService loginService;

    @Autowired
    UserService userService;

    @GetMapping("/dailylog2/login")
    public String loginPage(){

        return "login";
    }

    @PostMapping(value = "/api/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public RedirectView loginForFormRequest(@ModelAttribute LoginRequestDto requestDto,HttpServletRequest request, HttpServletResponse response) throws IOException {

        HttpSession session = request.getSession(true);
        User sessionUser = (User) session.getAttribute("dailylog2_user");
        if(sessionUser != null){
            session.removeAttribute("dailylog2_user");
        }

        if(checkLogin(requestDto)){
            User user = userService.selectUser(requestDto);
            session.setMaxInactiveInterval(3600);
            session.setAttribute("dailylog2_user", user);
            return new RedirectView("/dailylog2/one/month");
        }


        return new RedirectView("/dailylog2/login?loginSuccessYN=N");

    }

    private Boolean checkLogin(LoginRequestDto requestDto){

        boolean isExist= loginService.checkLogin(requestDto);
        if(isExist){
            return true;
        }
        return false;
    }
}
