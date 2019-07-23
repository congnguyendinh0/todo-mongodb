import React, { Component } from 'react';
import Calendar from 'react-calendar';

class AddToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            time: '--:--',
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
        if (this.state.time === '--:--' || this.state.todo.length < 7) {
            e.preventDefault();
            console.log("yes")
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
        var error = this.state.error ? <span>Insert valid time and more than 7 characters for ToDo input field!</span> : '';
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                />
                <form onSubmit={this.handleSubmit}>
                    <label>When</label>
                    <input type="time" onChange={this.getValueOfWhen}></input>
                    <label>What to do?</label>
                    <input type="text" onChange={this.getValueOfToDo}></input>
                    <button type="submit">Submit</button>
                    {error}
                </form>
            </div>
        );
    }
}

export default AddToDo;