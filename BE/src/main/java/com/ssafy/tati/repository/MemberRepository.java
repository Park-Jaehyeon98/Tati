package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudyMember;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    //닉네임으로 회원 조회
    Optional<Member> findByMemberNickName(String nickName);

    //이메일로 회원 조회
    Optional<Member> findByEmail(String email);

    //회원수정 > 비밀번호 수정
    @Modifying(clearAutomatically = true)
    @Query("update Member as m set m.password= :password where m.memberId= :memberId")
    void updatePassword(@Param("password") String password, @Param("memberId") Integer memberId);

    //회원수정 > 닉네임 수정
    @Modifying(clearAutomatically = true)
    @Query("update Member as m set m.memberNickName= :nickName where m.memberId= :memberId")
    void updateNickname(@Param("nickName") String nickName, @Param("memberId") Integer memberId);

    //포인트 수정
    @Modifying(clearAutomatically = true)
    @Query("update Member as m set m.totalPoint = :totalPoint where m.memberId= :memberId")
    void updatePoint(@Param("totalPoint") Integer totalPoint, @Param("memberId") Integer memberId);

    //회원 식별번호로 스터디회원목록 조회
    @Query("select s.study from StudyMember as s join s.member as m where m.memberId = :memberId")
    List<Study> selectStudyMemberList(@Param("memberId") Integer memberId);

}
