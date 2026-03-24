package com.example.student.service;

import com.example.student.entity.Student;
import com.example.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    // Filter by department
    public List<Student> getByDepartment(String dept) {
        return repository.findByDepartment(dept);
    }

    // Filter by age
    public List<Student> getByAge(int age) {
        return repository.findByAgeGreaterThan(age);
    }

    // Sorting
    public List<Student> getSortedStudents() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    // Pagination
    public Page<Student> getPaginatedStudents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);
    }

    // Pagination + filter
    public Page<Student> getByDeptWithPagination(String dept, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
        return repository.findByDepartment(dept, pageable);
    }
}