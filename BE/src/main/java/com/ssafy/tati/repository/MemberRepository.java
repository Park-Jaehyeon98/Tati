package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    //회원식별번호로 회원 조회
    Optional<Member> findById(Long memberId);

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



}
