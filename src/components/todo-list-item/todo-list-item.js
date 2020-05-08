import React from 'react';
import './todo-list-item.css';

const TodoListItem = ( {label, onDeleted, 
            onToggleDone, 
            onToggleImportant, 
            done, important} ) => {

        let classNames = 'todo-list-item'; 

        if (done) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }
        
        return (
            <span className={classNames}>
    
                <span className='todo-list-item-label' 
                    onClick={ onToggleDone }>
                    { label }
                </span>
    
                <button type='button'
                onClick={ onToggleImportant }
                className='btn btn-outline-success btn-sm float-right'>
                    <i className='fa fa-exclamation'/>
                </button>
     
                <button type='button'
                onClick={ onDeleted }
                className='btn btn-outline-success btn-sm float-right'>
                    <i className='fa fa-trash-o'/>
                </button>
            </span>
        );
}
export default TodoListItem;