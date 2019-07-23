import React, { Component } from 'react';
import ToDoApp from './ToDoApp';
import AddToDo from './AddToDo';

class AppComponent extends React.Component {

    render() {
        return <div>
            <ToDoApp />
        </div>
    }
}

export default AppComponent;