export default function TodoList({ todos, onTodoDoneChange, onTodoDelete }) {
    console.log("TodoList being created.");

    function onDoneChange(e, todo){
        todo.done = e.target.checked;
        onTodoDoneChange(todo);
    }

    function onDeleteClick(e, todo){
        onTodoDelete(todo);
    }

    return (
        <>
            <ul className="todo-list">
                {
                    todos.map(todo => {
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