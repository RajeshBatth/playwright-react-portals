# React Portal Issue

This project demonstrate an issue in playwright component testing where playwright is unable to access elements mounted in a react portal.

[Demo Video](./public/portal%20issue%20demo.mov)

In the below code `formEl` is mounted in normal mode and inside portal, playwright can access when its mounted normal mode, but its unable to in portal mode.

```typescript jsx
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

```
