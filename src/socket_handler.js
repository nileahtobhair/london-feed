import openSocket from 'socket.io-client';
//const server_domain = 'http://127.0.0.1:5000';
const server_domain = 'https://the-london-feed.herokuapp.com';
const socket = openSocket(server_domain+'/travel');
const reviews_socket = openSocket(server_domain+'/reviews');
const gifs_socket = openSocket(server_domain+'/gifs');

/* handle messages from respective socket namespaces. 
  Open socket on page load and send start message when received 
  connection message.  */

var travel_messages = (handle_travel) => {
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

var gifs = (handle_gifs) => {
  gifs_socket.on('message', load => {
    if(typeof load.data === 'string'){
      if((load.data.toLowerCase()).includes('connected')){
        gifs_socket.emit('start', {data : {}});
      }
    }
    else{
      handle_gifs(null, load);
    }
  });
}

export { travel_messages , reviews , gifs };
