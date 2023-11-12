import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/v1/todo';

export default class TodoService {

    static async getAllTodos() {
        return await axios.get(BASE_URL + '/all');
    }
    static async addTodo(todo) {
        return await axios.post(BASE_URL + '/add', todo);
    }

    static async replaceTodos(newTodos) {
        return await axios.post(BASE_URL + '/replace', newTodos);
    }
    static async setDoneTodo(id) {
        return await axios.put(BASE_URL + '/done', id);
    }
    static async setImportantTodo(todo) {
        return await axios.put(BASE_URL + '/important', todo);
    }
    static async deleteTodo(id) {
        return await axios.delete(BASE_URL + '/delete/' +  id);
    }

    static async updatePriorities(todos) {
        return await axios.post(BASE_URL + '/update-pr', todos);
    }
}