//var SOCKET_HOST = "192.168.99.100";
var SOCKET_HOST = "172.22.152.16";
var SOCKET_PORT = "10202";

var timediff = 0;
var sender = false;

var audio = new Audio('test.flac');

var options = {
  hostname: SOCKET_HOST,
  port: SOCKET_PORT
};
var socket = socketCluster.connect(options);
socket.on('connect', function(){

});

// socket.on('timeping', function(data){
//   timediff = (new Date()).getTime() - data;
//   console.log(timediff);
//   timediff = data - (new Date()).getTime();
//   console.log(timediff);
// });

socket.emit('timeping', (new Date()).getTime());
socket.on('timepong', function(starttime){
  timediff = ((new Date()).getTime() - starttime) / 2;
  console.log(timediff);
});

$('#test-play').click(function(event){
  socket.publish('play', timediff);
  sender = true;
  // setTimeout(function(){
  //   sender = false;
  //   var audio = new Audio('test.flac');
  //   audio.play();
  // }, 5000)
});

socket.subscribe('play').watch(function(time){
  setTimeout(function(){
    audio.play();
  }, 5000 - time - timediff);
  // if(!sender){
  //   console.log(5000 - time - timediff);
  //   setTimeout(function(){
  //     audio.play();
  //   }, 5000 - time - timediff);
  // }else{
  //   console.log(5000 - timediff - timediff);
  //   setTimeout(function(){
  //     audio.play();
  //   }, 5000 - timediff - timediff);
  // }
      // var audio = new Audio('test.flac');
      // audio.play();
});
