package com.ssafy.tati.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Member {

    @Id //회원 식별 번호
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer memberId;

    //회원 이메일
    @Column(name = "email", length = 50, nullable = false, unique = true)
    private String email;

    //회원 비밀번호
    @Column(name = "password", length = 70, nullable = false)
    private String password;

    //회원 이름
    @Column(name = "member_name", length = 20, nullable = false)
    private String memberName;

    //회원 닉네임
    @Column(name = "member_nick_name", length = 10, nullable = false, unique = true)
    private String memberNickName;

    //회원 총 열정 지수
    @Column(name = "total_score", columnDefinition = "tinyint", nullable = false)
    private Integer totalScore;

    //회원 적립금
    @Column(name = "total_point", columnDefinition = "int", nullable = false)
    private Integer totalPoint;

    //회원 총 공부 시간
    @Column(name = "total_study_time", columnDefinition = "int", nullable = false)
    private Integer totalStudyTime;

    //회원 가입 날짜
    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    //가입한 스터디 목록
    @OneToMany(mappedBy = "member")
    List<StudyMember> studyList = new ArrayList<>();

    //신청한 스터디 목록


    //내가 쓴 게시글 목록
    @OneToMany(mappedBy = "member")
    List<Board> myBoardList = new ArrayList<>();

    @PrePersist
    public void prePersist(){
        createdDate = LocalDateTime.now();
    }
}

