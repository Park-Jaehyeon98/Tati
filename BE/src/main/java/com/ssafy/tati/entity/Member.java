package com.ssafy.tati.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer memberId;

    @Column(name = "email", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name = "password", length = 70, nullable = false)
    private String password;

    @Column(name = "member_name", length = 20, nullable = false)
    private String memberName;

    @Column(name = "member_nick_name", length = 10, nullable = false, unique = true)
    private String memberNickName;

    @Column(name = "total_score", columnDefinition = "tinyint", nullable = false)
    private Integer totalScore;

    @Column(name = "total_point", columnDefinition = "int", nullable = false)
    private Integer totalPoint;

    @Column(name = "total_study_time", columnDefinition = "int", nullable = false)
    private Integer totalStudyTime;
}
