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
```
  	#DONE:
    Init setups
    Mongodb basics
    Routes and Models basics
    GET and POST basics for Threads only
    Work on giving replies to Threads
    Replies to threads!
    Reply numbers!
    Images :
          Give threads a datafield for number of replies
      run everything client side fuck these kidz
      metrics for each thread on the catalog
      make catalog grid instead of list :)
        make it a dynamic list also
    FIX THE STYLING O M G
          Make it look nicer
        Cleaning up bootstrap
        Custom shits 
        Just cleanup dogge
        That shit look like the mf apple store

  	#TODO:

    Actionable:
      Finish styling of replies
      TESTING
      Add extra routing for images ?
      Images for replies
    Lazy Loading of images!
    Mini-votes:
        gold -> gold/brown, sparkle -> white/purple, clover -> green/black, fire -> red/orange, melon ->pink/green
          Threads and replies are able to be voted on.
          These votes have no real meaning , but they do display a cool number that you can click up to ... five? times per person
          Five different types of votes, each with a color
          This is more for fun
      Add an icon!
    Second floating reply box
    Implement Reply Peek 
      And markdown styling of replies and posts!
    Style 404
      Other error messages ?

    Future:
      Linking between threads make easy
      Settings in top right
      Inlcude more usability
        alt and title tags for everything
      Small icons for input fields and general things
      Implement Notes:
        Notes are brief messages you can leave that will directly tail a post
          No images allowed, like 128 characters max
            These notes will feature in a scrollable list at the end of that thread or reply header
        Notes on anything
          Notes only have one vote option , red circle
      Implement Little threads functions
        Like cool clicks on fings idk loll
      When replied to
        Able to peek at what the thread they are replying to is
          Meaning: on hover show the post, AND show a small note afterwards of what the post says 
            IE: ">>>134590 [OP here does anyone else think that....]"
      Add styling to headerbar
        Like on hover AMSEPS change color
        Come up with a better name?
      Global Inspection of threads
        Such as "featured post" that has a lot of views or votes
      Implement amount of times a thread has been viewed!
      IP accounts
        Keeps info such as:
          Amount of votes a poster has recieved
          Amout of views a poster has recieved?
          other small metrics
        Show my currently posted threads
      Smooth transitions
        When you refresh it smoothly includes new threads, shuffles order, and removes old ones
        Smooth introduction of new replies
      Admin controls
        Delete Threads
        Edit threads
      Security Fixations
        Make it so you can't just GET /world or whatever
          bc boy that just aint right
            https://security.stackexchange.com/questions/33837/get-vs-post-which-is-more-secure 
            https://www.netsparker.com/blog/web-security/rest-api-web-service-security/ 
            Although it appears that CRUD security should be handled through mongodb controls rather than server.js
        Using Captchas for posts https://www.npmjs.com/package/react-google-recaptcha
          https://www.npmjs.com/package/react-google-recaptcha-v3 
        Better stability in recieving posts
        Error messages for post failures
        Better clientside controls to help the user post the correct things
      Search
        Searching a catalog for individual threads
        Or a thread for replies?
        Or maybe both at tha same time
      Variable title?
        meaning that the title in the browser tab is variable
        Based on how many 'notifications' are in current thread
        Like:
          (5) Threadname
      Loading circles , various loading states
      Need thumbnails for images
        IMPORTANT
      Rewrite Error log for backend,
        Also make it return more proper jsons from response
      Reload page on upload
        (or just add new reply to the state)
        Also reload on reply
      Add a better 'refresh' button than just refreshing page
      Have Badges turn red when there is a new recent post from catalog
      Archiving old threads? How will it work
        Just have a field like archived: true
        xd
        or date of archival
      Get some handsome graphicks
        Ness
        Soure
        Photoshoppe
      Other individualizations
        Make that shit SEXY 
          THINK
      Server automatically archives old content
      Show amount of people currently viewing thread
      Make static pages
        IMPORTANT
        Homepage ?: maybe some dynamic lelements on that page
        Rules page
        Meme pages :)
      Post it on tha mf innernet

    #STRETCH GOALS:
      EPIC Chat Feature
      Separate boards ?
      ADVERTISE SHITTE
      ROBOT automod
        Delete SHIT before it is posted
        Delete SHIT AFTER it is posted
        Delete SHITTY replies ?
        Censor SHIT images :)
      Ape autoposters :)

    #Maybe?:
      Open source? fuk that lole
    
    #Makes me think:
      https://github.com/OpenIB/OpenIB/ wow what a shitty device
      https://github.com/OpenIB/OpenIB/blob/master/board-search.php search make me thinke
```