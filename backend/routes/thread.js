const router = require('express').Router();
let Thread = require('../models/thread.model');
let Reply = require('../models/reply.model');

router.route('/').get((req, res) => { //if GET <host>/thread/ -> do this
    Thread.find()
    .then(threads => res.json(threads))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/post_thread').post((req, res) =>{ // if POST <host>/thread/post_thread
    console.log("Post Thread Request:");
    const ThreadData={
        body_text: req.body.body_text,
        thread_title: req.body.thread_title,
        name: req.body.name,
        thread_number: Number(req.body.thread_number),
        post_date: Date.parse(req.body.post_date),
        thread_image: "abcde", //todo
        thread_votes: {
            red: 0,
            sparkle: 0,
            clover: 0,
            fire: 0,
            melon: 0
        }
    }

    const newThread = new Thread(ThreadData) //see imports

    console.log(ThreadData);

    newThread.save()
    .then(() => {
        res.json('Thread Added!')
    })
    .catch(err => {
        res.status(400).json('Error: ' + err)
    });
});

router.route('/:id').get((req, res) => { //if GET <host>/thread/threadid -> do this
    Thread.findById(req.params.id)
    .then(thisThread => {
        res.json(thisThread)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/replies').get((req, res) => {
    Reply.find({ //find with params
            'parent_thread': ':id'
        },
        'body_text reply_title name reply_number post_date reply_image reply_votes'
    ).then(replies =>{
        res.json(replies);
    }).catch(err=>{
        res.status(400).json('Error ' + err);
    })
});

router.route('/:id/post_reply').post((req, res) => {
    const ReplyData={
        body_text: req.body.body_text,
        reply_title: req.body.reply_title,
        name: req.body.name,
        reply_number: req.body.reply_number, //todo , make autoincrement
        parent_thread: ':id',
        post_date: Date.parse(req.body.post_date),
        reply_image: req.body.reply_image, //todo
        reply_votes: { // make req?
            red: 0,
            sparkle: 0,
            clover: 0,
            fire: 0,
            melon: 0
        }
    }

    const newReply = new Reply(ReplyData);

    newReply.save()
    .then(() => {
        res.json('Reply Added!');
    }).catch(err =>{
        res.status(400).json('Error: ' + err);
    });
});

module.exports = router;

/*
    implemented:
    POST Thread,
    POST Reply with parent thread
    GET All Threads
    GET Thread by threadID
    GET Replies to threadID

    Delete and Update is for noobs b
*/