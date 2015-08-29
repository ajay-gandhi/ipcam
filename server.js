
/**
 * Serves images, also saves them from cam
 */

// NPM Modules
var express = require('express'),
    spawn   = require('child_process').spawn;

/*********************************** Server ***********************************/

var app = express();

app.use(express.static(__dirname + '/html'));

// Start the server
var port = process.argv[3] || '8080';
var host = process.argv[4] || '127.0.0.1';

app.listen(port, host, function () {
  console.log('Serving on', host + ':' + port);
});

/*********************************** Camera ***********************************/

var take_pic = function () {
  // args should save to html/ subdir
  var args = ['-r', '12800x960', '--png', '85', '-D', '1', 'html/i.png'];
  var fswebcam = spawn('fswebcam', args);

  setTimeout(take_pic, 1000);
}

take_pic();
