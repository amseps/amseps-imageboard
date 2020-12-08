import Resizer from 'react-image-file-resizer';
const createReactClass = require('create-react-class');

const Util = createReactClass({
  statics: {



    hello: function() {
      return "Hello World";
    },
    timeSince: function(indate) { //https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
        var date = new Date(indate);
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = seconds / 31536000;
        if (interval > 1) {return (Math.floor(interval) + ((Math.floor(interval)===1)? " year" : " years"));}
        interval = seconds / 2592000;
        if (interval > 1) {return (Math.floor(interval) + ((Math.floor(interval)===1)? " month" : " months"));}
        interval = seconds / 86400;
        if (interval > 1) {return (Math.floor(interval) + ((Math.floor(interval)===1)? " day" : " days"));}
        interval = seconds / 3600;
        if (interval > 1) {return (Math.floor(interval) + ((Math.floor(interval)===1)? " hour" : " hours"));}
        interval = seconds / 60;
        if (interval > 1) {return (Math.floor(interval) + ((Math.floor(interval)===1)? " minute" : " minutes"));}
        return (Math.floor(seconds) + ((Math.floor(interval)===1)? " second" : " seconds"));
      },



  },
  render() {
      return ("");
  },
});

export default Util;