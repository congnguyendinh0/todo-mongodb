import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar } from '@material-ui/core';
import AddToDo from './AddToDo';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import ShowToDoDate from './ShowToDoDate';

const showCalendar = () => {
  return <p>Text</p>
}
class ToDoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      todos: [],
      value: 0
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.showAll = this.showAll.bind(this);
  }
  
  componentDidMount() {
    fetch('/api/')
      .then(response  => response.json())
      .then(data => {
        this.setState({
          todos: data
        })
      });
  }

  showAll() {
    return <>
      <Paper>
        <Table>
          <TableHead>
              <TableRow>
                <TableCell>ToDo</TableCell>
                <TableCell align="right">When?</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Delete?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.todos.map((todo, index) => {
                return (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">{todo.todo}</TableCell>
                    <TableCell align="right">{todo.date}</TableCell>
                    <TableCell align="right" >{todo.when}</TableCell>
                    <TableCell align="right">
                    <Fab onClick={() => this.deleteOnClick(todo)} aria-label="Delete" >
                        <DeleteIcon />
                    </Fab>
                    </TableCell>
                </TableRow>
                )
            })}
            </TableBody>
        </Table>
      </Paper>
    </>
  }


  deleteOnClick(event) {
    var data = {
      "_id": event._id
    }
    console.log(data);
    fetch('/api/deleteToDo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  showEntry() {
    return <ShowToDoDate />
  }

  showAddEntry() {
    return <AddToDo />
  }

  handleChange = (event, index) => {
    this.setState({ value: index})
  }
  render() {
    return (
      <div>
        <Router>
          <AppBar position="static" color="default">
            <Tabs value={this.state.value} onChange={this.handleChange}>
              <Tab label="Show all" component={Link} to="/api/getToDos" />
              <Tab label="Show <Date>" component={Link} to="/api/showDate" />
              <Tab label="Add ToDo entry" component={Link} to="/showAddEntry" />
            </Tabs>
          </AppBar>
          <Switch>
            <Route path="/api/getToDos" component={this.showAll} />
            <Route path="/api/showDate" component={this.showEntry} />
            <Route path="/showAddEntry" component={this.showAddEntry} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default ToDoApp;