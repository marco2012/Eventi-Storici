var echo_service = new WebSocket('ws://echo.websocket.org');

echo_service.onmessage = function(event){
  alert(event.data);
}

echo_service.onopen = function(){
  echo_service.send("hello!");
}
