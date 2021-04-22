package com.rc.dailylog2.interceptor;

import com.rc.dailylog2.config.auth.dto.SessionUser;
import com.rc.dailylog2.domain.user.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    private final Logger logger = (Logger) LoggerFactory.getLogger(LoginInterceptor.class.getName());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        SessionUser sessionUser = (SessionUser) request.getSession().getAttribute("dailylog2_user");

        if(sessionUser == null){
            response.sendRedirect("/dailylog2/login");
            return false;
        }
        logger.info(sessionUser.toString());
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
