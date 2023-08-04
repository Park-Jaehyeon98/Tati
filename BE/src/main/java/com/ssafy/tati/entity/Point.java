package com.ssafy.tati.entity;

import lombok.*;
import net.bytebuddy.asm.Advice;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Point {

    @Id //포인트 식별번호
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="point_id", nullable = false)
    private int pointId;

    //결제 고유번호
    private String tid;

    //날짜
    @Column(name="point_data", nullable = false)
    private LocalDateTime pointDate;

    //금액
    @Column(nullable = false)
    private Integer amount;

    //내용
    @Column(name = "p_content", nullable = true, length = 100)
    private String pContent;

    //회원식별번호
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

}
