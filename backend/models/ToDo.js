const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ToDoSchema = new Schema ({
    date: {
        type: String,
        required: true
    },
    when: {
        type: String
    },
    todo: {
        type: String,
        required: true,
        min: 7,
        max: 255
    }
})

const ToDo = mongoose.model('ToDo', ToDoSchema);

function findByDate(date) {
    ToDo.find({ date: date })
        .then(function(toDos) {
            res.send(JSON.stringify(toDos));
        })
}

module.exports = ToDo;