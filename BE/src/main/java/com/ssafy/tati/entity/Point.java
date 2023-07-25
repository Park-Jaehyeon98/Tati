package com.ssafy.tati.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Point {

    @Id //포인트 식별번호
    @Column(name="point_id", nullable = false)
    private int pointId;

    //날짜
    @Column(name="point_data", nullable = false)
    private String pointDate;

    //금액
    @Column(nullable = false)
    private int amount;

    //내용
    @Column(name = "pContent", length = 100, nullable = false)
    private String p_content;

    //회원식별번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

}
