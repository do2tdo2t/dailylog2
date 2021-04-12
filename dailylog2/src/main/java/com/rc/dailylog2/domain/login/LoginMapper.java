package com.rc.dailylog2.domain.login;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;

@Mapper
public interface LoginMapper {
    String checkLogin(HashMap map);
    String checkLoginOriginal(HashMap map);
}
