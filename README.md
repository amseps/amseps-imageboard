# amseps-imageboard
 React Native 2048-chen

![ABSTRACT](https://images.ctfassets.net/hrltx12pl8hq/5GaLeZJlLyOiQC4gOA0qUM/a0398c237e9744ade8b072f99349e07a/shutterstock_152461202_thumb.jpg?fit=fill&w=368&h=207)

# Basic Setup
First install `NODE: [https://nodejs.org/en/download/]` and `Git: [https://git-scm.com/downloads]` . Verify that these are downloaded with:
````
  git -v
  node -v
  npm -v
````
Because npm should come prepackaged with node. Then clone with git, or using github desktop.
```
  //git CLI:
  git clone https://github.com/amseps/amseps-imageboard
```
Within this clone we will have `/backend`, and `/amseps`, so within two separate commandlines type:
```
  npm install //only have to run the first time you clone down, for all of these installs
  cd backend
  npm install
  nodemon server //runs server.js locally, for debugging etc

//And the second commandline:

  cd amseps
  npm install 
  npm start
```
The website will then open in your browser and you are free to make changes :) Make sure that the DB you are using in server.js is the Dev server NOT the Prod!


# Vague Roadmap because using monday.com is for noobs

  	#DONE:
    Init setups
    Mongodb basics
    Routes and Models basics
    GET and POST basics for Threads only


  	#TODO:

    Actionable:
      Give threads a datafield for number of replies
      run everything client side fuck these kidz
      metrics for each thread on the catalog
      make catalog grid instead of list :)
        make it a dynamic list also


    Future:
      Work on giving replies to Threads
        Replies to threads!
        Reply numbers!
          Linking between threads make easy
      Mini-votes:
        red, sparkle, clover, fire, melon
      Notes:
        Notes on anything
      Little threads functions
        Like cool clicks on fings idk lolle
      Images https://www.npmjs.com/package/react-images-upload 
        I imagine that self hosting is cheaper than cloudinary or something
          Maybe do this earlier idke lole
        Also making thumbnails of images
        getting a unique address for images , secretly it may not be that tough
          like {thread._id}_{reply._id} or thread_num / reply_num
      Admin controls
        Delete Threads
        Edit threads
      Security Fixations
        Make it so you can't just GET /world or whatever
          bc boy that just aint right
        Using Captchas for posts https://www.npmjs.com/package/react-google-recaptcha
          https://www.npmjs.com/package/react-google-recaptcha-v3 
      Search
        Searching a catalog for individual threads
        Or a thread for replies?
        Or maybe both at tha same time
      Archiving old threads? How will it work
        Just have a field like archived: true
        xd
        or date of archival
      Make it look nicer
        Cleaning up bootstrap
        Custom shits 
        Just cleanup dogge
      Get some handsome graphicks
        Ness
        Soure
        Photoshoppe
      Other individualizations
        Make that shit SEXY 
          THINK
      Make static pages
        Homepage ?: maybe some dynamic lelements on that page
        Rules page
        Meme pages :)
      Post it on tha mf innernet

    #STRETCH GOALS:
      EPIC Chat Feature
      Separate boards ?
      ADVERTISE SHITTE
      ROBOT automod
      Ape autoposters :)

    #Maybe?:
      Open source?
    
    #Makes me think:
      https://github.com/OpenIB/OpenIB/ wow what a shitty device
      https://github.com/OpenIB/OpenIB/blob/master/board-search.php search make me thinke