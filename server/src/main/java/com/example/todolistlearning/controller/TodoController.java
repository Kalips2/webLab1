package com.example.todolistlearning.controller;

import com.example.todolistlearning.model.Todo;
import com.example.todolistlearning.service.TodoService;
import com.sun.net.httpserver.HttpsServer;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/todo")
@CrossOrigin(origins = "*")
public class TodoController {
  private final TodoService todoService;

  @Autowired
  public TodoController(TodoService todoService) {
    this.todoService = todoService;
  }

  @GetMapping("/all")
  public ResponseEntity<?> getAllTodos() {
    List<Todo> todos = todoService.findAll();
    return new ResponseEntity<>(todos, HttpStatus.OK);
  }
  @PostMapping("/add")
  public ResponseEntity<?> addTodo(@RequestBody Todo todo) {
    Todo savedTodo = todoService.addTodo(todo);
    return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
  }
  @PutMapping("/done")
  public ResponseEntity<?> setDoneTodo(@RequestBody Todo todo) {
    Todo doneTodo = todoService.setDoneTodo(todo.getId());
    return new ResponseEntity<>(doneTodo, HttpStatus.OK);
  }

  @PutMapping("/important")
  public ResponseEntity<?> setImportantTodo(@RequestBody Todo todo) {
    Todo importantTodo = todoService.setImportantTodo(todo.getId());
    return new ResponseEntity<>(importantTodo, HttpStatus.OK);
  }

  @PostMapping("/update-pr")
  public ResponseEntity<?> updatePriorities(@RequestBody List<Todo> todos) {
    try {
      todoService.updatePriorities(todos);
      return new ResponseEntity<>(HttpStatus.OK);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Помилка при оновленні пріоритетів в базі даних");
    }
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteTodo(@PathVariable Long id) {
    todoService.deleteById(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

}
