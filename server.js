
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

var args = [
  '-i', '/dev/video0', // Source is webcam (/dev/video0)
  '-f', 'avi',         // AVI format
  '-ar', '44100',      // Sampling rate
  '-ac', 2,            // Stereo
  'pipe:1'             // Pipe to stdout
];
var rec = spawn('ffmpeg', args);

rec.on('close', function (code) {
  console.log('camera child process exited with code ' + code);
});

// Stream video
app.get('/video.avi', function (req, res) {
  rec.stdout.pipe(res);
});
