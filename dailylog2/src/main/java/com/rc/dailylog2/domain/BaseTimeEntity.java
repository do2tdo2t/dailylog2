package com.rc.dailylog2.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

/*
* @MappedSuperclass : JPA Entity 클래스들이 BaseTimeEntity을 상속할 경우 필드들(createdDate, modifiedDate)도 컬럼으로 인식하도록합니다.
* @EntityListeners(AuditingEntityListener.class): BaseTimeEntity클래스에 Auditing 기능을 포함시킵니다.
*  ** Audting: 해당 데이터의 생성시간과 수정시간을 포함하는 일
*
* */
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity {
    @Column(nullable = false, updatable = false)
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    protected Date enterdate;

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    protected Date updatedate;

}
