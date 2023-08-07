package com.ssafy.tati.service;

import com.ssafy.tati.dto.res.StudyMemberListResDto;
import com.ssafy.tati.dto.res.StudyMemberResDto;
import com.ssafy.tati.dto.res.StudyMemberSecessionResDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudyMember;
import com.ssafy.tati.repository.MemberRepository;
import com.ssafy.tati.repository.StudyMemberRepository;
import com.ssafy.tati.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class StudyMemberService {
    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;
    private final StudyMemberRepository studyMemberRepository;

    public List<StudyMemberResDto> getStudyMember(Integer studyId) {
        List<StudyMember> studyMemberList = studyMemberRepository.findAllByStudyStudyId(studyId);
        if(studyMemberList == null){
            throw new RuntimeException("스터디가 존재하지 않습니다.");

        }
        List<StudyMemberResDto> studyMemberResDtoList = new ArrayList<>();
        for (StudyMember studyMember : studyMemberList) {
            Member member = studyMember.getMember();
            StudyMemberResDto studyMemberResDto = new StudyMemberResDto(member.getMemberNickName(), member.getTotalScore(), member.getCreatedDate());
            studyMemberResDtoList.add(studyMemberResDto);
        }
        return studyMemberResDtoList;
    }

//    public StudyMemberSecessionResDto studyMemberSecession(Integer studyId, Integer memberId) {
//
//    }


    ////////////////////////
    // 스터디룸 입실을 위해 스터디 멤버인지 확인
    public StudyMember findStudyMember(Integer studyId, Integer memberId) {
        Optional<StudyMember> optionalStudyMember = studyMemberRepository.findByStudyIdAndMemberId(studyId, memberId);
        if (optionalStudyMember.isEmpty()) {
            throw new RuntimeException();
        }

        StudyMember studyMember = optionalStudyMember.get();
        return studyMember;
    }
}
