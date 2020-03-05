package com.rc.dailylog2.domain.dailylog;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface DailylogMapper {
    List<Dailylog> selectTeamDailylogDetail(HashMap map);
}
