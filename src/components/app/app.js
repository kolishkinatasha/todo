import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
       
        todoData: [
             this.createTododItem('Learn React'),
             this.createTododItem('Learn Redux'),
             this.createTododItem('Learn Node'),
             this.createTododItem('Learn English')
        ],

        term: '',

        filter: 'all' // active, all, done
    };

    createTododItem(label) {
        return {
            label,
            important:false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        console.log('deleted', id)

        this.setState(({todoData}) => {
            const index = todoData.findIndex((el) => el.id === id) //ищем индекс элемента с id который мы получили
            const newArray = [
                ...todoData.slice(0, index),
                ...todoData.slice(index+1)
            ];

            return {
                todoData: newArray
            };
        })
    }

    addItem = (text) => {

        const newItem = this.createTododItem(text);

        //добавить элемент в массив

         this.setState(({ todoData }) => {
            const newArray = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArray
            };
         });

        // console.log('Added', text);
    };
    
   

    toggleProperty(arr, id, propName) {
            const index = arr.findIndex((el) => el.id === id)

            const oldItem = arr[index];
            const newItem = {...oldItem, [propName]: !oldItem[propName]};

            return [
                ...arr.slice(0, index),
                newItem,
                ...arr.slice(index+1)
            ];          
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
            todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
            todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({term});
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    search(items, term) {

        if (term.length === 0) {
            return items;
        };

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    filter(items, filter) {

        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    render() {
        
        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(
            this.search(todoData, term), filter);

        const doneCount = todoData
                    .filter((el) => el.done).length;

        const todoCount = todoData.length - doneCount;

        return(
            <div className='todo-app'>
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter 
                    filter={filter}
                    onFilterChange={this.onFilterChange} />
                </div>
                <TodoList 
                todoData={visibleItems}
                onDeleted={ this.deleteItem }
                onToggleImportant={ this.onToggleImportant } 
                onToggleDone = { this.onToggleDone }/>
                <ItemAddForm onItemAdd={this.addItem} />
            </div>
        );
    }
};