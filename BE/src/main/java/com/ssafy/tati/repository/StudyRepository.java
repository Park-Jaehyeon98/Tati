package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Integer> {

}
