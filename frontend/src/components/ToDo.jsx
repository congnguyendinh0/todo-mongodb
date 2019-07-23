import React, { Component } from 'react';

const ToDo = (props) => {
    const dataParse = props.data;
    return (
        <tr>
            <td>{props.date}</td>
            <td>{props.when}</td>
            <td>{props.todo}</td>
            <td><button onClick={props.onClick}></button></td>
        </tr>
    )
}

export default ToDo;