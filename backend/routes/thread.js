const router = require('express').Router();
const fs = require('fs');
const path = require('path');

//images
var multer = require('multer'); 

let Thread = require('../models/thread.model');
let Reply = require('../models/reply.model');
let World = require('../models/world.model');

//makes images work//////////////////////////////////////////////////////////////////////////
const DIR = './images';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        console.log("Recieved File: ");
        console.log(file)
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '_' + fileName)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        console.log("upload multer file: ");
        console.log(file);
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}
const upload = multer({storage: storage, fileFilter: fileFilter});

router.get("/:id/image", (req, res) => {
    console.log("Want Thread Image");
    Thread.findOne({_id: req.params.id}, (err, thread) => {
        console.log(thread);
        res.set("Content-Type", thread.thread_image_type);
        console.log(thread.thread_image);
        //console.log(res);
        res.send(fs.readFileSync("./images/" + thread.thread_image_filename));
    }).catch(err =>{
        console.log("Couldn't find the image");
    })
});

router.post('/post_thread', upload.single('thread_image'),(req, res, next) => { // if POST <host>/thread/post_thread
    try {// if image succeeded ...
        World.findOne()
        .then(theworld => {
            World.findOneAndUpdate({},{thread_number: theworld.thread_number+1}, {new:true, useFindAndModify: false}, (err, doc) => {
                const threadNum = doc.thread_number;
                const url = req.protocol + '://' + req.get('host');
                const filename = "abcde";
                const ThreadData={
                    //passed in vvv
                    body_text: req.body.body_text,
                    thread_title: req.body.thread_title,
                    name: req.body.name,
                    thread_image: url + '/images/' + req.file.filename,
                    thread_image_type: req.file.mimetype,
                    thread_image_filename: req.file.filename,
                    //autogenned vvvv
                    thread_number: threadNum, // that we just found
                    post_date: new Date(),
                    thread_votes: {
                        red: 0,
                        sparkle: 0,
                        clover: 0,
                        fire: 0,
                        melon: 0
                    },
                    archived: false,
                    number_of_replies: 0
                }
                const newThread = Thread(ThreadData);
                console.log(newThread);
                newThread.save()
                .then(() => {
                    console.log("New Thread Added: " + ThreadData.thread_number + " @ " +ThreadData.id)
                }).catch(err => {

                })
            }).catch(err =>{
                console.log("Failed to post thread");
            })
        }).catch(err => {
            console.log("Failed to Access World");
        });
    } catch (error) {
        console.error(error);
    }
});

router.route('/').get((req, res) => { //if GET <host>/thread/ -> do this
    Thread.find()
    .then(threads => res.json(threads))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => { //if GET <host>/thread/threadid -> do this
    Thread.findById(req.params.id)
    .then(thisThread => {
        res.json(thisThread)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/replies').get((req, res) => {
    console.log('Route: /thread/' + req.params.id + '/replies');
    Reply.find({'parent_thread': req.params.id}).
    then(replies =>{
        res.json(replies);
    }).catch(err=>{
        res.status(400).json('Error ' + err);
    })
});

router.route('/:id/post_reply').post((req, res) => {
    console.log("Cool New Reply");

    Thread.findOne({_id: req.params.id})
    .then(up_par_thread => {
        Thread.findOneAndUpdate({_id: req.params.id}, {number_of_replies: up_par_thread.number_of_replies+1}, {new: true, useFindAndModify: false})
        .then(par_thread => {
            World.findOne({})
            .then(par_this_world =>{
                World.findOneAndUpdate({}, {reply_number: par_this_world.reply_number+1}, {useFindAndModify: false, new: true})
                .then(this_world => {
                    const ReplyData={
                        body_text: req.body.body_text,
                        reply_title: req.body.reply_title,
                        name: req.body.name,
                        parent_thread: req.params.id,
                        reply_number: par_thread.number_of_replies, // all we had to get :(
                        local_reply_number: this_world.reply_number, // and this :(
                        post_date: new Date(),
                        reply_image: req.body.reply_image, 
                        reply_votes: {
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
                    }).catch(err => {
                        res.status(400).json('Error: ' + err);
                    });
                }).catch(err => {
                    console.log("Could not reach the world ... a glitch in the matrix... " + err);
                })
            }).catch(err => {
                console.log("Could not reach the world " + err);
            })
        }).catch(err =>{
            console.log("Can not find my self" + err);
        })
    }).catch(err => {
        console.log("Can't find my parent");
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