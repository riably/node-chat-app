var socket = io();

socket.on('connect',function (){
  console.log('Conected to server');
});

socket.on('disconnect',function (){
  console.log('Disconnected from server');
});
socket.on('newMessage',function (message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt:formattedTime
  });

  $("#messages").append(html);
  //
  // console.log('NewMessage', message);
  // var li = $('<li></li>');
  // li.text(`[${formattedTime}] ${message.from} : ${message.text}`);
  //
  // $('#messages').append(li);
});
socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $("#location-message-template").html();
  var html = Mustache.render(template, {
    url:  message.url,
    text: message.text,
    from: message.from,
    createdAt:formattedTime
  });
  $('#messages').append(html);
});

$('#message-form').on('submit', function(e){
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  socket.emit('createMessage',{
    from: 'User',
    text : messageTextbox.val()
  }, function(){
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');

locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr("disabled","disabled").text("Seending location...");

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr("disabled").text("Seend location");
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude:position.coords.longitude
    });
  }, function(){
    locationButton.removeAttr("disabled").text("Seend location");
    alert('Unable to fetch location.');
  })
});
