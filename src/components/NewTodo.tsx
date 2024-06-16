import React, { useRef } from 'react'

export const NewTodo: React.FC<{ onAddTodo: (todoText: string) => void; formError: string }> = ({ onAddTodo, formError }) => {

    const textInputRef = useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredText = textInputRef.current!.value;
        onAddTodo(enteredText);
        textInputRef.current!.value = '';
    };

    return (
        <form className="input-group" onSubmit={todoSubmitHandler}>
            <input className={`form-control ${formError ? 'is-invalid' : ''} flex-grow-1 me-2`} type='text' id='todo-text' ref={textInputRef} />
            <button className="btn btn-outline-primary" type='submit'>Add Todo</button>
        </form>
    )
}
