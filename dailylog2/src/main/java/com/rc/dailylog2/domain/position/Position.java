package com.rc.dailylog2.domain.position;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@ToString
@Getter
@NoArgsConstructor
@Entity
@Table(name="T_POSITION")
public class Position {
    @Id
    private String positioncode;

    private String positionname;

    public void setPositioncode(String positioncode) {
        this.positioncode = positioncode;
    }

    @Builder
    public Position(String positioncode, String positionname){
        this.positioncode = positioncode;
        this.positionname = positionname;
    }

}
