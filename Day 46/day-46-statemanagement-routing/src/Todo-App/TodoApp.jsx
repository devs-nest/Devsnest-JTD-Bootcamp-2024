import react, { createContext, useReducer, useState } from 'react'
import TodoList from './TodoList';
import AddTodo from './AddTodo';
const stockTodos = [
    {
        id: 1,
        text: "Wake up early at 5am.",
        done: true
    },
    {
        id: 2,
        text: "Learn JavaScript between 7:30am - 10am",
        done: true
    },
    {
        id: 3,
        text: "Break for 30 mins",
        done: true
    },
    {
        id: 4,
        text: "Learn HTML/CSS between 10:30am -1230",
        done: true
    }
];

let lastTodoId = stockTodos.slice(stockTodos.length - 1)[0].id;

function todosReducer(state, action) {
    switch (action.type) {
        case "add":
            const newTodo = { id: action.id, text: action.text, done: false };
            lastTodoId = action.id;
            return [...state, newTodo];
            break;
        case "delete":
            const todosFiltered = state.filter(i => i.id != action.id);
            return todosFiltered;
            break;
        case "update":
            return state.map((existingTodo) => {
                if (existingTodo.id === action.todo.id) {
                    return action.todo;
                } else {
                    return existingTodo;
                }
            })
            break;

        default:
            break;
    }
}

export const TodosAppContext = createContext(null);
export const TodosDispatchContext = createContext(null);

export default function TodoApp() {
    const [todos, dispatch] = useReducer(todosReducer, stockTodos);

    return (
        <>
            <TodosAppContext.Provider value={{ todos, lastTodoId }}>
                <TodosDispatchContext.Provider value={{dispatch}}>
                    <section>
                        <h2>Todo App</h2>
                        <AddTodo />
                        <section>
                            <TodoList />
                        </section>
                    </section>
                </TodosDispatchContext.Provider>
            </TodosAppContext.Provider>
        </>
    )
}