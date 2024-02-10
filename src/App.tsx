import './App.css'
import {useState} from 'react';
import {createPortal} from 'react-dom';

type Todo = {
    id: number;
    title: string
    completed?: boolean
}


function App() {
    const [todos, setTodos] = useState<Todo[]>([{id: 1, title: "Buy Milk"}])
    const [formMode, setFormMode] = useState<"portal" | 'normal' | 'none'>('none')
    const formEl = <div className={'form'}>
        <form onSubmit={e => {
            e.preventDefault()
            setFormMode('none')
            const data = e.currentTarget.elements.todo.value;
            setTodos(prevVal => [...prevVal, {id: Date.now(), title: data}])
        }}>
            <input name={'todo'} placeholder={'Enter Todo'}/>
            <button type={'submit'}>Submit</button>
        </form>
    </div>;
    return (
        <div>
            <div className={'btn-group'}>
                <button onClick={() => setFormMode('portal')}>Add Todo via Portal</button>
                <button onClick={() => setFormMode('normal')}>Add Todo Normal Mode</button>
            </div>
            <div className={'todos'}>
                {todos.map((todo) => (<div className={'todo-item'} key={todo.id}>
                    {todo.title}
                </div>))}
            </div>
            {formMode === 'portal' && createPortal(
                formEl,
                document.body
            )}
            {formMode === 'normal' && formEl}
        </div>
    )
}


export default App
