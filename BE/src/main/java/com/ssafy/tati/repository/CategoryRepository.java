package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findByCategoryId(Integer CategoryId);

}
