package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberNickName(String nickName);

    Optional<Member> findByEmail(String email);
}
