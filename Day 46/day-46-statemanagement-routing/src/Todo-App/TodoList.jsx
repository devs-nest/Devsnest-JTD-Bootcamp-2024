import { useContext } from "react";
import { TodosAppContext, TodosDispatchContext } from "./TodoApp";

export default function TodoList() {
    console.log("TodoList being created.");

    const todosAppContext = useContext(TodosAppContext);
    const todosDispatchContext = useContext(TodosDispatchContext);

    function onDoneChange(e, todo){
        todo.done = e.target.checked;
        todosDispatchContext.dispatch({ type: 'update', todo });
    }

    function onDeleteClick(e, todo){
        todosDispatchContext.dispatch({ type: 'delete', ...todo });
    }

    return (
        <>
            <ul className="todo-list">
                {
                    todosAppContext.todos.map(todo => {
                        return <li key={todo.id}>
                            <input type="checkbox" name={`${todo.id}-todo`} id={`${todo.id}-todo`} checked={todo.done} onChange={(e) => onDoneChange(e, todo)} />
                            <label htmlFor={`${todo.id}-todo`}>{todo.text}</label>
                            <button onClick={(e) => onDeleteClick(e, todo)}>X</button>
                        </li>
                    }
                    )}
            </ul>
        </>
    )
}