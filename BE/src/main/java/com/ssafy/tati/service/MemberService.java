package com.ssafy.tati.service;

import com.ssafy.tati.Exception.DataNotFoundException;
import com.ssafy.tati.Exception.MismatchDataException;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

//    회원가입
    public Member createMember(Member member){
        isExistedEmail(member.getEmail());
        isExistedNickName(member.getMemberNickName());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        Member createdMember = memberRepository.save(member);
        return createdMember;
    }

//    닉네임 중복확인
    public void isExistedNickName(String nickName){
        Optional<Member> optionalMember = memberRepository.findByMemberNickName(nickName);
        if (optionalMember.isPresent()) {
            throw new DuplicateKeyException("중복된 닉네임입니다.");
        }
    }

//    가입된 회원인지 확인
    public Member findVerifiedMember(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            return optionalMember.get();
        }
        throw new DataNotFoundException("회원이 존재하지 않습니다.");
    }

//    이메일 중복확인
    public void isExistedEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            throw new DuplicateKeyException("중복된 이메일입니다.");
        }
    }

//    비밀번호 확인
    public Member loginMember(Member member) {
        Member findMember = findVerifiedMember(member.getEmail());
        if (!passwordEncoder.matches(member.getPassword(), findMember.getPassword())) {
            throw new MismatchDataException("잘못된 비밀번호입니다.");
        }

        return findMember;
    }

//    임시 비밀번호 받기 > 비밀번호 수정
    public void passwordChange(Member member, String password) {
        member.setPassword(passwordEncoder.encode(password));
        memberRepository.save(member);
    }

    //이메일로 회원 조회
    public Member findByEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
        else return optionalMember.get();
    }

    //닉네임 수정
    public void modifyNickName(String email, String nickName){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
        else memberRepository.updateNickname(nickName, email);
    }

    //비밀번호 수정
    public void modifyPassword(String email, String password){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
        else memberRepository.updatePassword(passwordEncoder.encode(password), email);
    }


    //회원탈퇴
    public void deleteMember(int memberId){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
        else memberRepository.deleteById(memberId);
    }

    //모든 회원 보기
    public List<Member> selectAll(){
        return memberRepository.findAll();
    }


}
