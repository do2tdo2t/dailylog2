package com.rc.dailylog2.domain.login;

import com.rc.dailylog2.domain.holiday.Holiday;
import com.rc.dailylog2.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginRepository extends JpaRepository<User,Long> {
    public boolean existsByUseridAndEncpassword(String userid, String encpassword);

}
