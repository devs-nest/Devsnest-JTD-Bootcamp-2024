import { useContext, useState } from "react"
import { TodosAppContext, TodosDispatchContext } from "./TodoApp";

export default function AddTodo() {
    console.log('AddTodo being created.');

    const [text, setText] = useState("");

    const todosAppContext = useContext(TodosAppContext);
    const todosDispatchContext = useContext(TodosDispatchContext);

    function onAddClick(){
        onTodoAdd(text);
    }

    function onNewTodoChange(e){
        setText(e.target.value);
    }

    function onTodoAdd(text) {
        const newId = todosAppContext.lastTodoId + 1;
        todosDispatchContext.dispatch({ type: 'add', id: newId, text });
    }

    return (
        <>
            <div className="todo-add-container">
                <input type="text" name="newTodo" id="newTodo" value={text} onChange={onNewTodoChange} />
                <button onClick={onAddClick}>Add</button>
            </div>
        </>
    )
}