package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Member;
//import com.ssafy.tati.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    //닉네임으로 회원 조회
    Optional<Member> findByMemberNickName(String nickName);

    //이메일로 회원 조회
    Optional<Member> findByEmail(String email);

    //식별번호로 회원 조회
    Optional<Member> findById(Integer memberId);

//    //회원 식별번호로 가입 스터디목록 조회
//    @Query("select s.study from StudyMember as s join s.member as m where m.memberId = :memberId")
//    List<Study> selectStudyList(@Param("memberId") Integer memberId);
//
//    //회원 식별번호로 신청 스터디목록 조회
//    @Query("select a.study from StudyApplicant as a join a.member as m where m.memberId = :memberId")
//    List<Study> selectApplicantStudyList(@Param("memberId") Integer memberId);

    List<Member> findByMemberIdIn(List<Integer> memberIds);

}