package com.ssafy.tati.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberSchedule {

    @Id //회원일정 식별번호
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_schedule_id", nullable = false)
    private Integer memberScheduleId;

    //날짜
    @Column(name = "member_schedule_date")
    private LocalDate memberScheduleDate;

    //제목
    @Column(name = "member_schedule_title", length = 15, nullable = false)
    private String memberScheduleTitle;

    //내용
    @Column(name="member_schedule_content", length = 50, nullable = false)
    private String memberScheduleContent;


    //회원식별번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

}
