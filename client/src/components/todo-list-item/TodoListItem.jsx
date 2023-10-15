import React from 'react';
import "./todo-list-item.css"
import 'bootstrap/dist/css/bootstrap.min.css';
const TodoListItem = ({todo, onDeleted, onToggleDone, onToggleImportant}) => {

    let classNames = "todo-list-item";

    if (todo.done) {
        classNames += " done";
    }

    if (todo.important) {
        classNames += " important";
    }


    return (
        <div>
        <span className={classNames}>
                <span
                    className="todo-list-item-label"
                    onClick={onToggleDone}>
                    {todo.priority}. {todo.message}
                </span>
                <button
                    type="button"
                    className="btn btn-outline-success btn-sm float-sm-end"
                    onClick={onToggleImportant}>
                    <i className="fa fa-exclamation"/>
                </button>
                <button
                    type="button"
                    className="btn btn-outline-danger btn-sm float-sm-end"
                    onClick={onDeleted}>
                    <i className="fa fa-trash-o"/>
                </button>
            </span>
        </div>
    );
};

export default TodoListItem;