package com.ssafy.tati.service;

import com.ssafy.tati.entity.Member;
import com.ssafy.tati.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member createMember(Member member){
        isExistedEmail(member.getEmail());
        isExistedNickName(member.getMemberNickName());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        Member createdMember = memberRepository.save(member);
        return createdMember;
    }

    public void isExistedNickName(String nickName){
        Optional<Member> optionalMember = memberRepository.findByMemberNickName(nickName);
        if (optionalMember.isPresent()) {
            throw new RuntimeException("중복된 닉네임입니다.");
        }
    }

    public Member findVerifiedMember(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            return optionalMember.get();
        }
        throw new RuntimeException("회원이 존재하지 않습니다.");
    }

    public void isExistedEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            throw new RuntimeException("중복된 이메일입니다.");
        }
    }

    public Member loginMember(Member member) {
        Member findMember = findVerifiedMember(member.getEmail());
        if (!passwordEncoder.matches(member.getPassword(), findMember.getPassword())) {
            throw new RuntimeException("잘못된 비밀번호입니다.");
        }

        return findMember;
    }

    public void passwordChange(Member member, String password) {
        member.setPassword(passwordEncoder.encode(password));
        memberRepository.save(member);
    }
}
