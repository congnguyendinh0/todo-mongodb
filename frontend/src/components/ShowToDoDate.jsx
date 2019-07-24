import React, { Component } from 'react';
import Calendar from 'react-calendar';
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

import { makeStyles } from '@material-ui/core/styles';


class ShowToDoDate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        date: new Date(),
        todos: [],
        value: 0,
        retrievedData: false
      }
      this.componentDidMount = this.componentDidMount.bind(this);
      this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        var a = this.state.todos
        setTimeout(() => {
            if(a.length > 0) {
                this.setState( { retrievedData: true });
            } else {
                this.setState( { retrievedData: false });
            }
        }, 200)
    }

    handleChange = (date) => {
        this.setState({ date })
        var data = {
            "date": date.toDateString()
        }
        fetch('/api/showDate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            }).then(response => response.json()) 
            .then(reqData => {
                this.setState({
                    todos: reqData
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
    
    render() {
        var showData = this.state.retrievedData ? this.showAll() : 
            <Paper className="paper">
                <h3>There are no tasks for you and your team yet!
                    <br/> Go ahead and start to add something!
                    <br/> Or choose another date!
                </h3>
            </Paper>;
            
        return (
            <div className="section">
                <Calendar
                    className="calendar" 
                    onChange={this.handleChange}
                    value={this.state.date}
                />
                {showData}
            </div>
        )
    }
}

export default ShowToDoDate;