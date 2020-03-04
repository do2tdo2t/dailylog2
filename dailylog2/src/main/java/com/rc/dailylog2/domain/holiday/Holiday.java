package com.rc.dailylog2.domain.holiday;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@ToString
@Getter
@NoArgsConstructor
@Entity
@Table(name="T_HOLIDAY")
public class Holiday {
    @Id
    private Long holidayno;

    private String title;

    @Column(columnDefinition = "DATE")
    private String startday;

    @Column(columnDefinition = "DATE")
    private String endday;

    private String yyyy;

    @Builder
    public Holiday(String title, String startday, String endday, String yyyy){
        this.title = title;
        this.endday = endday;
        this.startday = startday;
        this.endday = endday;
        this.yyyy = yyyy;
    }
}
