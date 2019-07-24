import React, { Component } from 'react';
import Calendar from 'react-calendar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class AddToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            time: '07:30',
            todo: '',
            error: false
        }
        this.getValueOfWhen = this.getValueOfWhen.bind(this);
        this.getValueOfToDo = this.getValueOfToDo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        
    }

    onChange = (date) =>  {
        this.setState({ date })
    }

    getValueOfWhen(e) {
        console.log(e.target.value);
        this.setState({
            time: e.target.value
        })
    }
    getValueOfToDo(e) {
        this.setState({
            todo: e.target.value
        })
    }

    handleSubmit(e) {
        console.log(this.state.time)
        if (this.state.time === '--:--' || this.state.todo.length < 7 || this.state.time === '') {
            e.preventDefault();
            this.setState({
                error: true
            })
            return;
        } else {
            this.setState({
                error: false
            })
            const data = {
                date: this.state.date.toDateString(),
                when: this.state.time,
                todo: this.state.todo
            }
            console.log(data);
            var idx = this.state.date;
            console.log(idx);
            // TODO: add ToDO
            fetch('api/addElement/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }
    }

    render(){
        var error = this.state.error ? <span className="error" >Insert valid time and more than 7 characters for the textfield!</span> : '';
        return (
            <div className="section">
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    className="calendar"
                />
                <Paper className="to-do-form" rounded>
                <form>
                    <TextField className="form-textfield" type="time" onChange={this.getValueOfWhen} label="When?" defaultValue="07:30"  InputLabelProps={{ shrink: true }} validate></TextField>
                    <TextField className="form-textfield" placeholder="e.g. Buy Bubble Tea" label="What should be done?" onChange={this.getValueOfToDo} InputLabelProps={{ shrink: true }} validate></TextField>
                    <Button className="form-button" variant="contained" onClick={this.handleSubmit} color="primary">Submit</Button>
                    {error}
                </form>
                </Paper>
                
            </div>
        );
    }
}

export default AddToDo;