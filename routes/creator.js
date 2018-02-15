var express = require('express');
var router = express.Router();

var todo = require('fake-todo-list-js');


var auth = function(req, res, next) {
    if (req.query.token === 'Creator') {
      return next();
    }
    return res.status(401).json({message: 'Invalid token'})
}

var validId = function (req, res, next) {
    for (var i = 0; i < todo.getTodo().length; i++) {
        if (todo.getTodo()[i].id === parseInt(req.params.id)) {
            return next();
        }
    }
    return res.status(404).json({ message: 'Invalid ID' })
}

router.get('/todoList', function(req, res) {
    res.json(todo.getTodo());
})

router.post('/addTodo', auth, function (req, res, next) {
        for (var i = 0; i < todo.getUsers().length; i++) {
            if (todo.getUsers()[i].id === req.body.idAssigne) {
                return next();
            }
        }
            return res.status(404).json({ message: 'idAsigne not found in Users' })
    },
    function (req, res, next) {
        for (var i = 0; i < todo.getUsers().length; i++) {
            if (todo.getUsers()[i].id === req.body.idCreator) {
                return next();
            }
        }
            return res.status(404).json({ message: 'idCreator not found in Users' })
    },
    function (req, res) {
        if (req.body.idAssigne === req.body.idCreator) {
            res.status(400).json({ message: 'Creator != Assignee' });
        } else return res.status(201).json(todo.addTodo(req.body));

    });

router.delete('/del/:id', auth, validId,  function(req, res) {
    todo.deleteTodo(parseInt(req.params.id));
    res.json({message: 'product deleted'});
})

router.get('/actionNotComplete/:id', auth, validId, function(req, res) {
    res.json(todo.getComplete(parseInt(req.params.id)));
})

router.get('/users', function(req, res) {
    res.json(todo.getUsers());
})

router.post('/addUser', auth, function (req, res, next) {
        for (var i = 0; i < todo.getUsers().length; i++) {
            if (todo.getUsers()[i].id === req.body.id) {
                return res.status(400).json({ message: 'Duplicate ID' });
            }
        }
        return next();
    },

    function (req, res) {
        res.status(201).json(todo.addUsers(req.body));
});


router.get('/todoUserStatus', auth,  function(req, res) {
    res.json(todo.todoUser(parseInt(req.params.id)));
})


router.get('/actionTrue', auth, function(req, res) {
    res.json(todo.getActionTrue());
})


router.get('/actionFalse', auth, function(req, res) {
    res.json(todo.getActionTrue());
})


module.exports = router;
