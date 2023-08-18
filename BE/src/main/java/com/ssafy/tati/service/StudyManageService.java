package com.ssafy.tati.service;

import com.ssafy.tati.entity.Study;
import com.ssafy.tati.exception.DataNotFoundException;
import com.ssafy.tati.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class StudyManageService {

    private final StudyRepository studyRepository;

    //스터디 삭제
    public void removeStudy(Integer studyId){
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        if(!optionalStudy.isPresent()){
            throw new DataNotFoundException("해당 스터디가 존재하지 않습니다.");
        }

        studyRepository.deleteById(studyId);
    }

}
