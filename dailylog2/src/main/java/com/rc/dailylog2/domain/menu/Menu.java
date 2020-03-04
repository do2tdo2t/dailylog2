package com.rc.dailylog2.domain.menu;

import com.rc.dailylog2.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@ToString
@Getter
@NoArgsConstructor
@Entity
public class Menu extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //PK 생성 속성
    private String menuno;

    private String menuname;

    private String url;

    @Builder
    public Menu(String menuno,String menuname, String url){
        this.menuno = menuno;
        this.menuname = menuname;
        this.url = url;
    }

    //Entity 영속성에 의해
    //조건을 적용할 필요 없이 update 수행
    public void update(String menuname, String url) {
        this.menuname = menuname;
        this.url = url;

    }

}
