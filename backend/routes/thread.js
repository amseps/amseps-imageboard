const router = require('express').Router();
const fs = require('fs');
const path = require('path');

//images
var multer = require('multer'); 

let Thread = require('../models/thread.model');
let Reply = require('../models/reply.model');
let World = require('../models/world.model');

//makes images work//////////////////////////////////////////////////////////////////////////

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
        console.log(file);
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg .jpeg and .gif format allowed!'));
    }
}

const DIR = './images';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'thread_image'){
            cb(null, DIR);
        }else{ // (if is thumbnail)
            cb(null, (DIR+"/thumb"))
        }
    },
    filename: (req, file, cb) => {
        console.log("Recieved File (thread): ");
        console.log(file)
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '_' + fileName)
    }
});

const DIR_REPLIES = './images/images_replies';
const storage_replies = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'reply_image'){
            firstdate_replies = Date.now();
            cb(null, DIR_REPLIES);
        }else{ // is thumbnail
            cb(null, DIR_REPLIES+"/thumb");
        }
    },
    filename: (req, file, cb) => {
        console.log("Recieved File (reply): ");
        console.log(file)
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '_' + fileName)
    }
});
const m_limits = {fileSize:1048576} // 2mb
const upload = multer({storage: storage, fileFilter: fileFilter, limits: m_limits});
const upload_replies = multer({storage: storage_replies, fileFilter: fileFilter, limits: m_limits});

//////////////////////////////////////////////////////////////////////////////////////////////

router.get("/:id/image/thumb", (req, res) => {
    Thread.findById(req.params.id)
    .then((thread, err) => {
        if(thread){
            res.set("Content-Type", thread.thread_image_type);
            res.send(fs.readFileSync("./images/thumb/" + thread.thread_thumb_filename));
        }else{
            res.status(204);
            // console.log("Couldn't find the image err: " + err);
            // res.set("Content-Type", "image/png");
            // res.send(fs.readFileSync("./images/common_images/noimage.png"));
        }
    }).catch(err =>{
        res.status(204);
        // console.log("Couldn't find the image err: " + err);
        // res.set("Content-Type", "image/png");
        // res.send(fs.readFileSync("./images/common_images/noimage.png"));
    })
});
router.get("/:id/image", (req, res) => {
    console.log("Want Thread Image");
    Thread.findById(req.params.id)
    .then((thread, err) => {
        if(thread){
            res.set("Content-Type", thread.thread_image_type);
            res.send(fs.readFileSync("./images/" + thread.thread_image_filename));
        }else{
            console.log("Couldn't find the image err: " + err);
            res.set("Content-Type", "image/png");
            res.send(fs.readFileSync("./images/common_images/noimage.png"));
        }
    }).catch(err =>{
        console.log("Couldn't find the image err: " + err);
        res.set("Content-Type", "image/png");
        res.send(fs.readFileSync("./images/common_images/noimage.png"));
    })
});

router.get("/:id/image/:reply", (req, res) => {
    Reply.findById(req.params.reply)
    .then((reply, err) => {
        if(reply){
            console.log(reply);
            res.set("Content-Type", reply.reply_image_type);
            res.send(fs.readFileSync("./images/images_replies/" + reply.reply_image_filename));
        }else{
            console.log("Couldn't find the image err: " + err);
            res.set("Content-Type", "image/png");
            res.send(fs.readFileSync("./images/common_images/noimage.png"));
        }
    }).catch(err =>{
        console.log("Couldn't find the image err: " + err);
        res.set("Content-Type", "image/png");
        res.send(fs.readFileSync("./images/common_images/noimage.png"));
    })
});
router.get("/:id/image/:reply/thumb", (req, res) => {
    console.log("Want Reply Image");
    Reply.findById(req.params.reply)
    .then((reply, err) => {
        if(reply){
            console.log(reply);
            res.set("Content-Type", reply.reply_image_type);
            console.log(reply.reply_image);
            res.send(fs.readFileSync("./images/images_replies/thumb/" + reply.reply_thumb_filename));
        }else{
            console.log("Couldn't find the image err: " + err);
            res.set("Content-Type", "image/png");
            res.send(fs.readFileSync("./images/common_images/noimage.png"));
        }
    }).catch(err =>{
        console.log("Couldn't find the image err: " + err);
        res.set("Content-Type", "image/png");
        res.send(fs.readFileSync("./images/common_images/noimage.png"));
    })
});

router.post('/post_thread', 
upload.fields(
    [
        {name:'thread_image', max_count:1},
        {name:'thread_image_thumb', max_count:1}
    ],   
),
(req, res, next) => { // if POST <host>/thread/post_thread
    console.log('post thread?')
    try {// if image succeeded ...
        World.findOne()
        .then(theworld => {
            World.findOneAndUpdate({},{thread_number: theworld.thread_number+1}, {new:true, useFindAndModify: false}, (err, doc) => {
                const hasimage = (req.files['thread_image'][0])? true : false;
                const f = (hasimage)? req.files['thread_image'][0] : null;
                const threadNum = doc.thread_number;
                const url = req.protocol + '://' + req.get('host');
                const postername = (req.body.name) ? req.body.name : "anon";
                const ThreadData={
                    //passed in vvv
                    body_text: req.body.body_text,
                    thread_title: req.body.thread_title,
                    name: postername,
                    thread_image: (hasimage)? (url + '/images/' + f.filename) : null,
                    thread_image_type: (hasimage)? f.mimetype : null,
                    thread_image_filename: (hasimage)? f.filename : null,
                    thread_thumb_filename: (hasimage)? req.files['thread_image_thumb'][0].filename : null,
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
                .then((thisthread) => {
                    console.log("New Thread Added: " + thisthread.thread_number + " @ " +thisthread._id)
                    res.status(200).json({id:thisthread._id})
                }).catch(err => {
                    res.status(400).json({info:"bad"})
                })
            }).catch(err =>{
                res.status(400).json({info:"bad"})
            })
        }).catch(err => {
            res.status(500).json({info:"uh oh"})
            console.log("Failed to Access World");
        });
    } catch (error) {
        res.status(500).json({info:"uh oh"})
        console.error(error);
    }
});

router.route('/').get((req, res) => { //if GET <host>/thread/ -> do this
    Thread.find()
    .then(threads => res.json(threads))
    .catch(err => res.status(400).json({info:'ERROR; Failed to find thread: ' + err}));
});

router.route('/:id').get((req, res) => { //if GET <host>/thread/threadid -> do this
    Thread.findById(req.params.id)
    .then(thisThread => {
        res.json(thisThread)
    })
    .catch(err => res.status(400).json({info:'ERROR; Failed to find thread of id ' + req.params.id + err}));
});

router.route('/:id/replies').get((req, res) => {
    console.log('Route: /thread/' + req.params.id + '/replies');
    Reply.find({'parent_thread': req.params.id}).
    then(replies =>{
        res.json(replies);
    }).catch(err=>{
        res.status(204).json('Current thread has no replies '+  + err);
    })
});

router.post('/:id/post_reply', 
upload_replies.fields([
        {name:'reply_image', maxCount:1},
        {name:'reply_image_thumb', maxCount:1}
    ]
),
(req, res, next) => {
    try{
        Thread.findOne({_id: req.params.id})
        .then(up_par_thread => {
            Thread.findOneAndUpdate({_id: req.params.id}, {number_of_replies: up_par_thread.number_of_replies+1}, {new: true, useFindAndModify: false})
            .then(par_thread => {
                World.findOne({})
                .then(par_this_world =>{
                    World.findOneAndUpdate({}, {reply_number: par_this_world.reply_number+1}, {useFindAndModify: false, new: true})
                    .then(this_world => {
                        const hasimage = (req.files['reply_image'])? true : false;
                        const f = (hasimage)? req.files['reply_image'][0] : null;
                        console.log(req);
                        const postname = (req.body.name) ? req.body.name : "anon";
                        const replyNum = this_world.reply_number;
                        const url = req.protocol + '://' + req.get('host');
                        const ReplyData={
                            body_text: req.body.body_text,
                            name: postname,
                            parent_thread: req.params.id,
                            local_reply_number: par_thread.number_of_replies, // all we had to get :(
                            reply_number: this_world.reply_number, // and this :(
                            post_date: new Date(),
                            reply_image: (hasimage)?url + "/" + par_thread._id + '/images/reply_images/' + f.filename : null,
                            reply_image_type: (hasimage)? f.mimetype : null,
                            reply_image_filename: (hasimage)? f.filename : null,
                            reply_thumb_filename: (hasimage)? req.files['reply_image_thumb'][0].filename : null,
                            has_image: hasimage,
                            reply_votes: {
                                red: 0,
                                sparkle: 0,
                                clover: 0,
                                fire: 0,
                                melon: 0
                            }
                        }
                        console.log(ReplyData);
                        const newReply = new Reply(ReplyData);
                        newReply.save()
                        .then(() => {
                            res.status(200).json('Reply Added!');
                        }).catch(err => {
                            res.status(400).json({info:'ERROR: Failed to post ' + err});
                        });
                    }).catch(err => {
                        console.log("Could not reach the world ... a glitch in the matrix... " + err);
                        res.status(400).json({info:'ERROR: Failed to post ' + err});
                    })
                }).catch(err => {
                    console.log("Could not reach the world " + err);
                    res.status(400).json({info:'ERROR: Failed to post ' + err});
                })
            }).catch(err =>{
                console.log("Can not find my self" + err);
                res.status(400).json({info:'ERROR: Failed to post ' + err});
            })
        }).catch(err => {
            console.log("Can't find my parent");
            res.status(400).json({info:'ERROR: Failed to post ' + err});
        });
    }catch(err){
        console.log("error in posting reply " + err);
        res.status(400).json({info:'ERROR: Failed to post ' + err});
    }
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