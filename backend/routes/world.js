const router = require('express').Router();
let World = require('../models/world.model');

router.route('/').get((req, res) => { //if GET <host>/thread/ -> do this
    World.findOne()
    .then(theworld => {
        console.log("GET World :" + req.hostname);
        res.json(theworld);
    })
    .catch(err => {
        res.status(400).json('world/ Error: ' + err)
    });
});

router.route('/new_thread').get((req, res) => {
    World.findOne() //There's only one entry in this collection
    .then(theworld => {
        theworld.thread_number = theworld.thread_number + 1;

        theworld.save()
        .then(() => res.json(theworld))
        .catch(err => res.status(400).json('WORLD Error: ' + err));
    }).catch((err) =>{
        console.log("world/new_thread Error: " + err)
    });
});

module.exports = router;

/*
    implemented:
    GET world

    Delete and Update is for noobs b
*/