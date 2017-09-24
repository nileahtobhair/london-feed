import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000/travel');
const reviews_socket = openSocket('http://localhost:5000/reviews');

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
}

var reviews = (handle_reviews) => {
  reviews_socket.on('message', load => {
    if(typeof load.data === 'string'){
      if((load.data.toLowerCase()).includes('connected')){
        reviews_socket.emit('start', {data : {}});
      }
    }
    else{
      handle_reviews(null, load);
    }
  });
}

export { travel_messages , reviews };
