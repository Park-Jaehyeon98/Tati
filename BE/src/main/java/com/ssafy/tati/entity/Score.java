package com.ssafy.tati.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Score {

    @Id //열정지수 식별번호
    @Column(name="score_id", nullable = false)
    private int scoreId;

    //날짜
    @Column(name = "score_date", nullable = false)
    private String scoreDate;

    //열정지수
    private int score;

    //내용
    @Column(name = "s_content", length = 50, nullable = false)
    private String sContent;

    //회원 식별 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;


}
