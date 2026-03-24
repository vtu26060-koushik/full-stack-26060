package com.example.student.controller;

import com.example.student.entity.Student;
import com.example.student.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService service;

    // Filter by department
    @GetMapping("/department/{dept}")
    public List<Student> getByDepartment(@PathVariable String dept) {
        return service.getByDepartment(dept);
    }

    // Filter by age
    @GetMapping("/age/{age}")
    public List<Student> getByAge(@PathVariable int age) {
        return service.getByAge(age);
    }

    // Sorting
    @GetMapping("/sorted")
    public List<Student> getSorted() {
        return service.getSortedStudents();
    }

    // Pagination
    @GetMapping("/page")
    public Page<Student> getPaginated(
            @RequestParam int page,
            @RequestParam int size) {
        return service.getPaginatedStudents(page, size);
    }

    // Pagination + Filter
    @GetMapping("/dept-page")
    public Page<Student> getDeptPaginated(
            @RequestParam String dept,
            @RequestParam int page,
            @RequestParam int size) {
        return service.getByDeptWithPagination(dept, page, size);
    }
}