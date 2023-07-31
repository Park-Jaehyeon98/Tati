package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    //닉네임으로 회원 조회
    Optional<Member> findByMemberNickName(String nickName);

    //이메일로 회원 조회
    Optional<Member> findByEmail(String email);

    //회원수정 > 비밀번호 수정
    @Modifying(clearAutomatically = true)
    @Query("update Member as m set m.password= :password where m.email= :email")
    void updatePassword(@Param("password") String password, @Param("email") String email);

    //회원수정 > 닉네임 수정
    @Modifying(clearAutomatically = true)
    @Query("update Member as m set m.memberNickName= :nickName where m.email= :email")
    void updateNickname(@Param("nickName") String nickName, @Param("email") String email);

    //포인트 수정
    @Modifying(clearAutomatically = true)
    @Query("update Member as m set m.totalPoint = :totalPoint where m.memberId= :memberId")
    void updatePoint(@Param("totalPoint") Integer totalPoint, @Param("memberId") Integer memberId);

}
