import {useEffect, useState} from "react";
import TodoService from "./services/TodoService";
import AppHeader from "./components/app-header/app-header";
import TodoList from "./components/todo-list/TodoList";
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemAddForm from "./components/item-add-form/ItemAddForm";
import "./App.css";
import SearchPanel from "./components/search-panel/search-panel";
import ItemStatusFilter from "./components/item-status-filter/ItemStatusFilter";
import Footer from "./components/footer/footer";
import {io} from "socket.io-client";

function App() {

    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [term, setTerm] = useState("");
    const [message, setMessage] = useState("");
    const socket = io('http://localhost:3001');

    useEffect(() => {
        TodoService.getAllTodos().then(response => {
            const sortedTodos = response.data.sort((a, b) => a.priority - b.priority);
            setTodos(sortedTodos);
        });

        setTerm(localStorage.getItem("term") || "");
        setMessage(localStorage.getItem("message") || "");
        setTodos(JSON.parse(localStorage.getItem('todos')) || []);
        window.addEventListener("storage", onStorageUpdate);
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, [])
    const deleteTodo = (id) => {
        TodoService.deleteTodo(id).then(_ => {
            const priority = todos.find(todo => todo.id === id).priority;
            const todosWithoutDeleted = todos.filter(todo => todo.id !== id);

            setTodos(todosWithoutDeleted)
            localStorage.setItem('todos', JSON.stringify(todosWithoutDeleted));

            const todosToUpdatePr = []
            todosWithoutDeleted.forEach(todo => {
                if (todo.priority > priority) {
                    todo.priority -= 1;
                    todosToUpdatePr.push(todo)
                }
            });
            TodoService.updatePriorities(todosToUpdatePr).then(response => console.log(response.data))
        })
    }

    const addTodo = (message) => {
        let todo = {
            priority: todos.length + 1,
            message: message,
            done: false,
            active: false,
            important: false
        };

        TodoService.addTodo(todo).then(response => {
            let newTodos = [...todos, response.data];
            setTodos(newTodos)
            localStorage.setItem('todos', JSON.stringify(newTodos));
        })
    }
    const replaceTodos = (newTodos) => {
        setTodos(newTodos)
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const toggleProperty = (todos, response, id) => {
        const index = todos.findIndex(todo => todo.id === id);

        //Update value in general list!
        return [
            ...todos.slice(0, index),
            response,
            ...todos.slice(index + 1)
        ];
    };

    const onToggleImportant = (todo) => {
        TodoService.setImportantTodo(todo).then(response => {
            const newTodos = toggleProperty(todos, response.data, todo.id);
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
        })
    }
    const onToggleDone = (todo) => {
        TodoService.setDoneTodo(todo).then(response => {
            const newTodos = toggleProperty(todos, response.data, todo.id);
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
        })
    }
    const onFilterChange = (filter) => {
        setFilter(filter)
    }
    const doneCount = todos.filter((todo) => todo.done).length;
    const todoCount = todos.length - doneCount;

    const searchTodo = (items, term) => {
        if (term.length === 0)
            return items;
        return items.filter(item => {
            return item.message.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    const filterTodo = (items, filter) => {
        switch (filter) {
            case 'all' :
                return items;
            case 'active' :
                return items.filter(item => !item.done)
            case 'done' :
                return items.filter(item => item.done);
            default :
                return items;
        }
    }

    const handleTermChange = (events) => {
        const newTerm = events.target.value;
        setTerm(newTerm);
        localStorage.setItem("term", newTerm);
    }

    const handleMessageChange = (events) => {
        const newMessage = events.target.value;
        setMessage(newMessage)
        localStorage.setItem("message", newMessage)
    }

    const onStorageUpdate = (e) => {
        const {key, newValue} = e;
        if (key === "term") {
            setTerm(newValue);
        }
        if (key === "message") {
            setMessage(newValue);
        }
        if (key === "todos") {
            setTodos(JSON.parse(localStorage.getItem('todos')) || [])
        }
    };

    const filterForTodos = (todos) => {
        return filterTodo(searchTodo(todos, term), filter);
    }

    return (
        <div>
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel term={term}
                                 handleTermChange={handleTermChange}
                                 socket={socket}/>
                    <ItemStatusFilter filter={filter}
                                      onFilterChange={onFilterChange}/>
                </div>
                <TodoList todos={todos}
                          setTodos={setTodos}
                          filterForTodos={filterForTodos}
                          onDeleted={deleteTodo}
                          onToggleImportant={onToggleImportant}
                          onToggleDone={onToggleDone}
                          replaceTodos={replaceTodos}
                          socket={socket}/>
                <ItemAddForm message={message}
                             onItemAdded={addTodo}
                             handleMessageChange={handleMessageChange}/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
