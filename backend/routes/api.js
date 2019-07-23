var express = require('express');
var router = express.Router();
const ToDo = require('../models/ToDo');

/* GET api/register */
router.get('/', function(req, res, next) {
    ToDo.find({})
    .then(function(toDos) {
        res.send(JSON.stringify(toDos));
    })
});

router.get('/getToDos', function(req, res, next) {
    ToDo.find({})
    .then(function(toDos) {
        res.send(JSON.stringify(toDos));
    })
});

router.post('/deleteToDo', function(req, res, next) {
    console.log('Clicked on element: ' + req.body);
    ToDo.findByIdAndRemove(req.body._id, function (err) {
        if (err) throw err;
        console.log('Deleting' + req.body._id + ' successful...')
    });
    res.send(req.body._id + " is deleted")
});
router.post('/addElement', function(req, res, next) {
    var todo = new ToDo(req.body);

    console.log(todo);
    todo.save(function(err, todo) {
        if (err) throw console.error(err);
        console.log(todo + " was added");
    })
});




module.exports = router;