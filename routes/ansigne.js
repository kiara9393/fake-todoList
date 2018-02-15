var express = require('express');
var router = express.Router();

var todo = require('fake-todo-list-js');
var validTokens = ['Pippo','Caio','Sempronio'];

var authAssigne = function(req, res, next) {
    if (validTokens.includes(req.query.token)){
        return next();
    }
    res.status(401).json({message:'Invalid token'});
}

var validId = function (req, res, next) {
    for (var i = 0; i < todo.getTodo().length; i++) {
        if (todo.getTodo()[i].id === parseInt(req.params.id)) {
            return next();
        }
    }
    return res.status(404).json({ message: 'Invalid ID' })
}

router.get('/todoList', authAssigne, function(req, res) {
    res.status(200).json(todo.getTodo());
})


router.get('/actionComplete/:id', authAssigne, validId, function(req, res) {
    res.json(todo.getComplete(parseInt(req.params.id)));
})



module.exports = router;