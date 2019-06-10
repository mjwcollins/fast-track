var User = require('../models/user');
var moment = require('moment');

module.exports = {
    show,
    update,
    removeFood
};

function show(req, res) {
    User.findById(req.user.id)
    .then(user => {
        if(user.activeFast.name !== 'none') {
            if (user.activeFast.endTime.getTime() < new Date(moment().format())) {
                user.prevFasts.push(user.activeFast);
                user.activeFast.name = 'none';
                user.activeFast.startDate = undefined;
                user.activeFast.endDate = undefined;
                user.save(err => console.log(err));
            }
        }
        res.render('users/show', {
            user: req.user
        });
    }).catch(err => console.log(err));
}

function update(req, res) {
    User.findById(req.user.id)
    .then(user => {
        user.activeFast.foods.push(req.body.food);
        user.save();
        res.redirect('/users');
    })
    .catch(err => console.log(err));
}

function removeFood(req, res) {
    User.findById(req.user.id)
    .then(user => {
        var index = user.activeFast.foods.findIndex(food => {
            return food === req.params.food;
        })
        user.activeFast.foods.splice(index, 1);
        user.save(err => console.log(err));
        res.redirect('/users');
    }).catch(err => console.log(err));
}