var User = require('../models/user');
var moment = require('moment');

module.exports = {
    new: newFast,
    create
};

function newFast(req, res) {
    if(req.user.activeFast.name != "none") {
        res.redirect('/users');
    }
    res.render('fasts/new', { who: req.user.email });
}

function create(req, res) {
    User.findById(req.user._id)
    .then(user => {
        fastName = req.body.fast;
        if(fastName === 'temp') {
            user.activeFast.endTime = new Date(moment().add(-7, 'hours').format())
        } else {
            if(fastName === 'short') {
                duration = 16;
            } else if(fastName === 'medium') {
                duration = 18;
            } else if(fastName === 'long'){
                duration = 20;
            }
            user.activeFast.endTime = new Date(moment().add(duration - 7, 'hours').format());
        } 
        user.activeFast.name = fastName;
        user.activeFast.foods = [];
        user.save(err => console.log(err))

        res.redirect('/users');
    }).catch(err => console.log(err));
}