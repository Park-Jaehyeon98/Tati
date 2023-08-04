package com.ssafy.tati.service;

import com.ssafy.tati.dto.res.StudyApplicantMemberResDto;
import com.ssafy.tati.dto.res.StudyIdResDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudyApplicant;
import com.ssafy.tati.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class StudyApplicantService {
    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;
    private final StudyApplicantRepository studyApplicantRepository;

    public StudyIdResDto studyApplicantMember(Integer studyId, Integer memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("회원 정보가 존재하지 않습니다"));
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new RuntimeException("study가 존재하지 않습니다."));
        Integer point = member.getTotalPoint() - study.getStudyDeposit();
        if (point < 0) { new RuntimeException("스터디에 참가하는데 포인트가 부족합니다");  }

        StudyApplicant studyApplicant = null;
        member.updateTotalPoint(point);
        Optional<StudyApplicant> optionalStudyApplicant = studyApplicantRepository.findByMemberMemberIdAndStudyStudyId(memberId, studyId);
        if(optionalStudyApplicant.isPresent()) {
            throw new RuntimeException("이미 신청한 스터디입니다.");
        }
        studyApplicant = new StudyApplicant(study, member, study.getStudyDeposit());

        studyApplicantRepository.save(studyApplicant);
        StudyIdResDto studyIdResDto = new StudyIdResDto(memberId);
        return studyIdResDto;
    }

    public List<StudyApplicantMemberResDto> getStudyApplicantMember(Integer studyId) {
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new RuntimeException("study가 존재하지 않습니다."));
        List<StudyApplicant> studyApplicantList = studyApplicantRepository.findAllByStudyStudyId(studyId);
        List<StudyApplicantMemberResDto> studyApplicantMemberResDtoList = null;
        for (StudyApplicant studyApplicant: studyApplicantList) {
            Member member = studyApplicant.getMember();
            StudyApplicantMemberResDto studyApplicantMemberResDto = new StudyApplicantMemberResDto(member.getMemberId(), member.getMemberNickName(), member.getTotalScore(), member.getTotalStudyTime());
            studyApplicantMemberResDtoList.add(studyApplicantMemberResDto);
        }
        return studyApplicantMemberResDtoList;
    }
}
