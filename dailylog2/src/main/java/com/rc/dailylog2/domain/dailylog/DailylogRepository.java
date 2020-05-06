package com.rc.dailylog2.domain.dailylog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailylogRepository extends JpaRepository<Dailylog, Long> {
    //나의 해당월의 업무일지 가져오기
    public List<Dailylog> findByWorkeridAndWorkingdayBetween(String workerid, String startdate, String enddate);

    @Query(value= "select * from t_dailylog where workerid = :workerid and workingday between :startdate and :enddate" , nativeQuery = true)
    public List<Dailylog> findListByWorkerid(@Param("workerid") String workerid,
                                             @Param("startdate") String startdate,
                                             @Param("enddate") String enddate);

    //상세 내용 가져오기
    public Dailylog findByWorkeridAndWorkingday(String workerid, String workingday);

    public Dailylog findByDailylogno(Long dailylogno);

    //해당월의 팀 전체 업무일지 가져오기
    public List<Dailylog> findByDeptcodeAndWorkingdayBetween(String deptcode, String startdate, String enddate);

    //나의 해당일 업무일지 가져오기
    public Dailylog findByWorkeridAndWorkingdayLike(String workerid, String workingday);

    @Query(value= "select dailylogno, workingday, username, workerid" +
            " from t_dailylog a" +
            " inner join t_user b" +
            " a.userid = b.workerid" +
            " where workerid = :workerid and workingday between :startdate and :enddate" , nativeQuery = true)
    public List<Dailylog> findDailylogListMonth(
            @Param("workerid") String workerid,
            @Param("startdate") String startdate,
            @Param("enddate") String enddate);
}
