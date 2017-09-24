import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000/travel');

function travel_messages(handle_travel) {
  socket.on('message', load => {
  	if(typeof load.data === 'string'){
	  	if((load.data.toLowerCase()).includes('connected')){
	  		socket.emit('start', {data : {}});
	  	}
  	}
  	else{
  		handle_travel(null, load);
  	}
  });
 // socket.on('connection', data => handle_travel(null, 'connected - connected'));
}

export { travel_messages };
