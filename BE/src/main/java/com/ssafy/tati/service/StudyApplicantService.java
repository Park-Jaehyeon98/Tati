package com.ssafy.tati.service;

import com.ssafy.tati.dto.res.StudyApplicantApprovalMemberResDto;
import com.ssafy.tati.dto.res.StudyIdResDto;
import com.ssafy.tati.entity.*;
import com.ssafy.tati.exception.PointException;
import com.ssafy.tati.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class StudyApplicantService {
    private final PointService pointService;
    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;
    private final StudyApplicantRepository studyApplicantRepository;
    private final StudyMemberRepository studyMemberRepository;

    public StudyIdResDto studyApplicantMember(Integer studyId, Integer memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("회원 정보가 존재하지 않습니다"));
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new RuntimeException("해당 스터디가 존재하지 않습니다."));
        Integer applicantPoint = member.getTotalPoint() - study.getStudyDeposit();
        if (applicantPoint < 0) { throw new PointException("해당 스터디에 참가하는데 포인트가 부족합니다");  }

        Optional<StudyApplicant> optionalStudyApplicant = studyApplicantRepository.findByMemberMemberIdAndStudyStudyId(memberId, studyId);
        if(optionalStudyApplicant.isPresent()) {
            throw new RuntimeException("이미 신청한 스터디입니다.");
        }

        Point point = new Point(0, "", LocalDateTime.now(), -study.getStudyDeposit(),
                ("[스터디 신청] '" +study.getStudyName())+ "' 신청", member);
        pointService.delete(point);

        StudyApplicant studyApplicant = new StudyApplicant(study, member);
        studyApplicantRepository.save(studyApplicant);

        StudyIdResDto studyIdResDto = new StudyIdResDto(studyId);
        return studyIdResDto;
    }

    @Transactional(readOnly = true)
    public List<Member> getStudyApplicantMember(Integer studyId) {
        List<StudyApplicant> studyApplicants = studyApplicantRepository.findAllByStudyStudyId(studyId);
        List<Integer> memberIds = studyApplicants.stream().map(StudyApplicant::getMemberId).collect(Collectors.toList());
        return memberRepository.findByMemberIdIn(memberIds);
    }

    public StudyApplicantApprovalMemberResDto getStudyApplicantApprovalMember(Integer studyId, Integer memberId){
        StudyApplicant studyApplicant = studyApplicantRepository.findByMemberMemberIdAndStudyStudyId(memberId, studyId).orElseThrow(() -> new RuntimeException("해당 스터디 신청 회원이 아닙니다."));
        LocalDate localDate = LocalDate.now();
        studyMemberRepository.save(new StudyMember(localDate, studyApplicant.getStudy(), studyApplicant.getMember()));

        studyApplicant.getStudy().setTotalDeposit(studyApplicant.getStudy().getStudyDeposit());
        StudyApplicantApprovalMemberResDto studyApplicantApprovalMemberResDto = new StudyApplicantApprovalMemberResDto(studyId, memberId, studyApplicant.getMember().getMemberNickName());

        studyApplicantRepository.deleteById(studyApplicant.getStudyApplicantId());

        return studyApplicantApprovalMemberResDto;
    }

    public StudyApplicantApprovalMemberResDto getStudyApplicantRefuseMember(Integer studyId, Integer memberId) {
        StudyApplicant studyApplicant = studyApplicantRepository.findByMemberMemberIdAndStudyStudyId(memberId, studyId).orElseThrow(() -> new RuntimeException("해당 스터디 신청 회원이 아닙니다."));
        Member member = studyApplicant.getMember();
        Study study = studyApplicant.getStudy();

        Point point = new Point(0, "", LocalDateTime.now(), study.getStudyDeposit(),
                ("[보증금 반환] '" +study.getStudyName())+ "' 신청 취소" , member);
        pointService.save(point);

        studyApplicantRepository.deleteById(studyApplicant.getStudyApplicantId());
        StudyApplicantApprovalMemberResDto studyApplicantApprovalMemberResDto = new StudyApplicantApprovalMemberResDto(memberId, studyId, studyApplicant.getMember().getMemberNickName());
        return studyApplicantApprovalMemberResDto;
    }
}
