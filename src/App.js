import React, { Component } from 'react';
import logo from './skyline.png';
import Feed from './main-feed.js';
import Cats from './cats.js';
import Reviews from './reviews.js';
import { travel_messages , reviews } from './socket_handler.js';

class App extends Component {

  constructor(props){
    super();
    this.get_api_load_data();
    this.state = {
      visible_tab : 'updates',
      travel : [],
      added_travel : [],
      reviews : [],
      added_reviews : [],
      cats : []
    }
  }

  componentDidMount(){
    var main = this;
    travel_messages((err, load) => {
      var new_travel = main.state.added_travel; new_travel.unshift(load.data);
      main.setState({added_travel : new_travel })
     });

    reviews((err, load) => {
      console.log('received new reviews',load);
      var new_reviews = main.state.added_reviews; new_reviews.unshift(load.data);
      main.setState({added_reviews : new_reviews })
     });
  }

  get_api_load_data(){
    var main = this;
    fetch('http://127.0.0.1:5000/sync', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
      }).then((response) => response.json())
        .then((responseJson) => {
          main.setState({
            reviews : (responseJson.reviews ?   responseJson.reviews  : []),
            cats : (responseJson.gifs ?   responseJson.gifs  : []),
            travel : (responseJson.travel ?   responseJson.travel  : [])
          })
        })
        .catch((error) => {
          console.error(error);
        });
  }

  change_visible_tab (change_to){
    this.setState( {visible_tab : change_to });
  }

  render() {
    var main = this;
    return (
      <div className="App">
        <div className="feed-heading">
          <img src={logo} className="" alt="london skyline" />
          <h2>London Feed</h2>
        </div>
        <div>
          <div className='menu'>
            <div className='tab' onClick={ (e) => main.change_visible_tab('updates')} >Updates</div>   
            <div className='tab' onClick={ (e) => main.change_visible_tab('reviews')} >Reviews</div>   
            <div className='tab' onClick={ (e) => main.change_visible_tab('cats')} >Cats</div>
          </div>
          { main.state.visible_tab === 'updates' ? 
              <Feed added={main.state.added_travel} data={main.state.travel}/>

          : main.state.visible_tab === 'reviews' ? 
            <Reviews added={main.state.added_reviews} data={main.state.reviews}/> : <Cats data={main.state.cats}/> }
        </div>
      </div>
    );
  }
}

export default App;
