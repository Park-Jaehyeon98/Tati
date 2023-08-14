package com.ssafy.tati.service;

import com.ssafy.tati.dto.res.StudyMemberResDto;
import com.ssafy.tati.dto.res.StudyMemberSecessionResDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Point;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudyMember;
import com.ssafy.tati.repository.MemberRepository;
import com.ssafy.tati.repository.StudyMemberRepository;
import com.ssafy.tati.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class StudyMemberService {
    private final MemberService memberService;
    private final PointService pointService;
    private final MemberRepository memberRepository;
    private final StudyRepository studyRepository;
    private final StudyMemberRepository studyMemberRepository;

    public List<StudyMemberResDto> getStudyMember(Integer studyId) {
        List<StudyMember> studyMemberList = studyMemberRepository.findAllByStudyStudyId(studyId);
        if(studyMemberList == null){
            throw new RuntimeException("스터디가 존재하지 않습니다.");
        }
        List<StudyMemberResDto> studyMemberResDtoList = new ArrayList<>();
        for (StudyMember studyMember : studyMemberList) {
            Member member = studyMember.getMember();
            StudyMemberResDto studyMemberResDto = new StudyMemberResDto(member.getMemberNickName(), member.getTotalScore(),
                    member.getCreatedDate().toString(), member.getTotalStudyTime());
            studyMemberResDtoList.add(studyMemberResDto);
        }
        return studyMemberResDtoList;
    }

    public StudyMemberSecessionResDto studyMemberSecession(Integer studyId, Integer memberId) {
        StudyMember studyMember = studyMemberRepository.findByStudyStudyIdAndMemberMemberId(studyId, memberId).orElseThrow(() -> new RuntimeException("해당 스터디의 참가 회원이 아닙니다."));
        int cur_point = studyMember.getStudy().getStudyDeposit() - studyMember.getStudyMemberPenalty();

        Study study = studyMember.getStudy();
        Member member = memberService.findById(memberId);

        study.setTotalPenalty( studyMember.getStudy().getTotalPenalty() +
                studyMember.getStudyMemberPenalty());

        //열정지수 > 가입 날짜
        List<StudyMember> studyMemberList = study.getStudyMemberList();

        if(study.getStudyHost()== memberId) {
            Integer maxScore= 0;
            Integer maxMemberId= 0;

            for(StudyMember searchStudyMember : studyMemberList){
                if(maxScore < searchStudyMember.getMember().getTotalScore()) {
                    maxScore = searchStudyMember.getMember().getTotalScore();
                    maxMemberId = searchStudyMember.getMember().getMemberId();
                }

                else if(maxScore == searchStudyMember.getMember().getTotalScore()) {
                    LocalDate date1 = studyMemberRepository.findById(maxMemberId).get().getStudyJoinDate();
                    LocalDate date2 = searchStudyMember.getStudyJoinDate();

                    if(date1.isAfter(date2)) {
                        maxScore = searchStudyMember.getMember().getTotalScore();
                        maxMemberId = searchStudyMember.getMember().getMemberId();
                    }
                }
            }
            study.setStudyHost(maxMemberId);
        }

        Point point = new Point(0, "", LocalDateTime.now(), cur_point,
                (studyMember.getStudy().getStudyName() + " 스터디 탈퇴 보증금 반환"), member);
        pointService.save(point);

        if(study.getStudyMemberList().size()==1) studyRepository.deleteById(studyId);
        else studyMemberRepository.deleteById(studyMember.getStudyMemberId());
        StudyMemberSecessionResDto studyMemberSecessionResDto = new StudyMemberSecessionResDto(studyMember.getMember().getMemberNickName(), studyMember.getStudy().getStudyName());
        return studyMemberSecessionResDto;
    }

    // 스터디룸 입실을 위해 스터디 멤버인지 확인
    public Optional<StudyMember> findStudyMember(Integer studyId, Integer memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new RuntimeException();
        }
        Member member = optionalMember.get();
        Optional<StudyMember> optionalStudyMember = studyMemberRepository.findByStudyStudyIdAndMember(studyId, member);
        if (optionalStudyMember.isEmpty()) {
            return Optional.empty();
        }

        return optionalStudyMember;
    }
}
