package com.rc.dailylog2.web;


import com.rc.dailylog2.domain.user.User;
import com.rc.dailylog2.service.login.LoginService;
import com.rc.dailylog2.service.user.UserService;
import com.rc.dailylog2.web.dto.LoginRequestDto;
import com.rc.dailylog2.web.dto.LoginResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.io.IOException;

@RequiredArgsConstructor
@Controller
public class LoginController {

    @Autowired
    LoginService loginService;

    @Autowired
    UserService userService;

    @GetMapping("/dailylog2/login")
    public String loginPage(){

        return "login";
    }


    @PostMapping(value = "/api/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void loginForFormRequest(@ModelAttribute LoginRequestDto requestDto, HttpServletRequest request, HttpServletResponse response) throws IOException {
        User user;

        System.out.println("loginForFormRequest");
        System.out.println(requestDto.toString());
        HttpSession session = request.getSession();
        User sessionUser = (User) session.getAttribute("dailylog2_user");
        if(sessionUser != null){
            session.removeAttribute("dailylog2_user");
        }

        if(checkLogin(requestDto)){
            user = userService.selectUser(requestDto);
            session.setAttribute("dailylog2_user", user);
            session.setAttribute("dailylog2_loginsuccess","Y");

            response.sendRedirect("/dailylog2/one/month");
        }

        session.setAttribute("dailylog2_loginsuccess","N");
        response.sendRedirect("/dailylog2/login");
    }

    private Boolean checkLogin(LoginRequestDto requestDto){

        boolean isExist= loginService.checkLogin(requestDto);
        if(isExist){
            return true;
        }
        return false;
    }
}
