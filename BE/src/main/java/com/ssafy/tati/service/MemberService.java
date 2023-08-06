package com.ssafy.tati.service;

import com.ssafy.tati.entity.Attendance;
import com.ssafy.tati.exception.DataNotFoundException;
import com.ssafy.tati.exception.MismatchDataException;
//import com.ssafy.tati.dto.res.MemberBoardListResDto;
//import com.ssafy.tati.entity.Board;
import com.ssafy.tati.entity.Member;
//import com.ssafy.tati.entity.Study;
//import com.ssafy.tati.repository.BoardRepository;
import com.ssafy.tati.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    //private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    //회원가입
    public Member createMember(Member member){
        isExistedEmail(member.getEmail());
        isExistedNickName(member.getMemberNickName());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        Member createdMember = memberRepository.save(member);
        return createdMember;
    }

    //닉네임 중복확인
    public void isExistedNickName(String nickName){
        Optional<Member> optionalMember = memberRepository.findByMemberNickName(nickName);
        if (optionalMember.isPresent()) {
            throw new DuplicateKeyException("중복된 닉네임입니다.");
        }
    }

    //가입된 회원인지 확인
    public Member findVerifiedMember(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            return optionalMember.get();
        }
        throw new DataNotFoundException("회원이 존재하지 않습니다.");
    }

    //이메일 중복확인
    public void isExistedEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            throw new DuplicateKeyException("중복된 이메일입니다.");
        }
    }

    //비밀번호 확인
    public Member loginMember(Member member) {
        Member findMember = findVerifiedMember(member.getEmail());
        if (!passwordEncoder.matches(member.getPassword(), findMember.getPassword())) {
            throw new MismatchDataException("잘못된 비밀번호입니다.");
        }

        return findMember;
    }

    //임시 비밀번호 받기 > 비밀번호 수정
    public void passwordChange(Member member, String password) {
        member.setPassword(passwordEncoder.encode(password));
        memberRepository.save(member);
    }

    //식별번호로 회원 조회
    public Member findById(Integer memberId){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
        else return optionalMember.get();
    }

    //이메일로 회원 조회
    public Member findByEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
        else return optionalMember.get();
    }

    //닉네임 수정
    public void modifyNickName(Integer memberId, String nickName){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
        else optionalMember.get().updateNickName(nickName);

    }

    //비밀번호 수정
    public void modifyPassword(Integer memberId, String password){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
        else optionalMember.get().updatePassword(password);
    }

    //이미지 수정
    public void modifyImg(Integer memberId, String url){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
        else optionalMember.get().updateImg(url);
    }


    //회원탈퇴
    public void deleteMember(int memberId){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
        else memberRepository.deleteById(memberId);
    }


    //회원이 가입한 스터디 조회
//    public List<Study> selectStudyList(Integer memberId){
//        Optional<Member> optionalMember = memberRepository.findById(memberId);
//        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
//
//        List<Study> studyList = memberRepository.selectStudyList(memberId);
//        return studyList;
//    }
//
//    //회원이 신청한 스터디 조회
//    public List<Study> selectApplicantStudyList(Integer memberId){
//        Optional<Member> optionalMember = memberRepository.findById(memberId);
//        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
//
//        List<Study> studyList = memberRepository.selectApplicantStudyList(memberId);
//        return studyList;
//    }
//
//    //회원이 작성한 글 조회
//    public List<Board> selectBoardList(Integer memberId){
//        Optional<Member> optionalMember = memberRepository.findById(memberId);
//        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}
//
//        List<Board> boardList = boardRepository.findByEmail(memberId);
//        return boardList;
//    }

    //회원 입퇴실 조회
    public List<Attendance> attendanceList(Integer memberId){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (!optionalMember.isPresent()) { throw new DataNotFoundException("등록된 회원이 아닙니다.");}

        List<Attendance> attendanceList = optionalMember.get().getAttendanceList();
        return attendanceList;
    }

    //모든 회원 조회
    public List<Member> selectAll(){
        return memberRepository.findAll();
    }


}