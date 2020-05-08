import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ( { todoData, onDeleted,
                    onToggleImportant, 
                    onToggleDone } ) => {

    const  elements = todoData.map((item) => { 
        
        const { id, ...itemProps } = item; //в id запишем только id, все остальное в itemProps чтобы в TodoListItem не передавать лишний параметр id

        return (
            <li key={id} className='list-group-item'>
                <TodoListItem
                    {...itemProps}
                    onDeleted={() => onDeleted(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}/>
            </li>
        );
    });

    return(
        <ul className='list-group todo-list'>
           { elements }
        </ul>
    );
};

export default TodoList;