package com.rc.dailylog2.domain.holiday;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {
    //select * from t_holiday where startday >= :startday and endday <= :endday
    public List<Holiday> findByStartdayGreaterThanEqualAndEnddayLessThanEqual(String startday, String endday);


}
