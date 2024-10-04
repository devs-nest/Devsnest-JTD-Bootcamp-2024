import { useState } from "react"

export default function AddTodo( {onTodoAdd}) {
    console.log('AddTodo being created.')

    const [text, setText] = useState("");


    function onAddClick(){
        onTodoAdd(text);
    }

    function onNewTodoChange(e){
        setText(e.target.value);
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