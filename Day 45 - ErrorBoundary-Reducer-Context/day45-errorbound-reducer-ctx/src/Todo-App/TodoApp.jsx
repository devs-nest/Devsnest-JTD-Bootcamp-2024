import react, { useReducer, useState } from 'react'
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

export default function TodoApp() {
    // const [todos, setTodos] = useState(stockTodos);
    const [todos, dispatch] = useReducer(todosReducer, stockTodos);

    function onTodoAdd(text) {
        const newId = lastTodoId + 1;
        // setTodos([...todos, { id: newId, text, done: false }]);

        dispatch({ type: 'add', id: newId, text });
        lastTodoId = newId;
    }

    function onDoneChange(updatedTodo) {
        // setTodos(
        //     todos.map((existingTodo) => {
        //         if (existingTodo.id === updatedTodo.id) {
        //             return updatedTodo;
        //         } else {
        //             return existingTodo;
        //         }
        //     })
        // )

        dispatch({type: 'update', todo: updatedTodo})
    }

    function onTodoDelete(deletedTodo) {
        const todosFiltered = todos.filter(i => i.id != deletedTodo.id);

        //setTodos(todosFiltered);

        dispatch({ type: 'delete', ...deletedTodo });
    }

    return (
        <>
            <section>
                <h2>Todo App</h2>
                <AddTodo onTodoAdd={onTodoAdd} />
                <section>
                    <TodoList todos={todos} onTodoDoneChange={onDoneChange} onTodoDelete={onTodoDelete} />
                </section>
            </section>
        </>
    )
}