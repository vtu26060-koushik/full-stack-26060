package com.example.student.repository;

import com.example.student.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // Find by department
    List<Student> findByDepartment(String department);

    // Find students with age greater than
    List<Student> findByAgeGreaterThan(int age);

    // Find by department and age
    List<Student> findByDepartmentAndAge(String department, int age);

    // Pagination + filtering
    Page<Student> findByDepartment(String department, Pageable pageable);
}