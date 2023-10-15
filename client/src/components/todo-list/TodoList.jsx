import React from 'react';
import TodoListItem from "../todo-list-item/TodoListItem";
import "./todo-list.css";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TodoService from "../../services/TodoService";

const TodoList = ({todos, setTodos, filterForTodos, onDeleted, onToggleImportant, onToggleDone}) => {

    if (!todos.length) {
        return <h1 style={{textAlign: "center"}}>Справ нема!</h1>
    }
    const onDragEnd = (result) => {
        // Check if the drop was successful
        if (!result.destination) {
            return;
        }

        // Rearrange the todos based on the new order
        const reorderedTodos = [...todos];
        const [reorderedItem] = reorderedTodos.splice(result.source.index, 1);
        reorderedTodos.splice(result.destination.index, 0, reorderedItem);


        reorderedTodos.forEach((todo, index) => {
            todo.priority = index + 1;
        });

        // Update state with the new order of todos
        setTodos(reorderedTodos)
        TodoService.updatePriorities(reorderedTodos).then(response => console.log(response.data))
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <ul
                        className="list-group todo-list"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {filterForTodos(todos).map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                {(provided) => (
                                    <li
                                        className="list-group-item"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <TodoListItem
                                            todo={todo}
                                            onDeleted={() => onDeleted(todo.id)}
                                            onToggleDone={() => onToggleDone(todo)}
                                            onToggleImportant={() => onToggleImportant(todo)}
                                        />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default TodoList;