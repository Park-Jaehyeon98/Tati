package com.ssafy.tati.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;


@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MemberSchedule {

    @Id //회원일정 식별번호
    @Column(name="member_schedule_id", nullable = false)
    private int memberScheduleId;

    //날짜
    @Column(name = "member_schedule_date")
    private String memberScheduleDate;

    //내용
    @Column(name="member_schedule_content", length = 50, nullable = false)
    private String memberScheduleContent;

    //제목
    @Column(name = "member_schedule_title", length = 15, nullable = false)
    private String memberScheduleTitle;

    //회원식별번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

}
