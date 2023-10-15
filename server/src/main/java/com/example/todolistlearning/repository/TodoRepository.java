package com.example.todolistlearning.repository;

import com.example.todolistlearning.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
