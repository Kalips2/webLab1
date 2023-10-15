package com.example.todolistlearning.service;

import com.example.todolistlearning.model.Todo;
import com.example.todolistlearning.repository.TodoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TodoServiceImpl implements TodoService {

  private final TodoRepository todoRepository;

  @Autowired
  public TodoServiceImpl(TodoRepository todoRepository) {
    this.todoRepository = todoRepository;
  }

  @Override
  public List<Todo> findAll() {
    return todoRepository.findAll();
  }

  @Override
  public Todo addTodo(Todo todo) {
    return todoRepository.save(todo);
  }

  @Override
  public Todo setDoneTodo(Long id) {
    Todo todo = todoRepository.findById(id).get();
    todo.setDone(!todo.isDone());

    return todoRepository.save(todo);
  }

  @Override
  public Todo setImportantTodo(Long id) {
    Todo todo = todoRepository.findById(id).get();
    todo.setImportant(!todo.isImportant());
    return todoRepository.save(todo);
  }

  @Override
  public void deleteById(Long id) {
    todoRepository.deleteById(id);
  }

  @Override
  public void updatePriorities(List<Todo> todos) {
    for (Todo updatedTodo : todos) {
      System.out.println(updatedTodo.getMessage());
      Todo existingTodo = todoRepository.findById(updatedTodo.getId()).orElse(null);
      if (existingTodo != null) {
        existingTodo.setPriority(updatedTodo.getPriority());
        todoRepository.save(existingTodo);
      }
    }
  }
}
