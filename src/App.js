import React, { Component } from 'react';
import logo from './skyline.png';
import Feed from './main-feed.js';
import Cats from './cats.js';
import Favs from './favs.js';
import Reviews from './reviews.js';
import { travel_messages , reviews, gifs } from './socket_handler.js';
const server_domain = 'http://127.0.0.1:5000';

class App extends Component {

  constructor(props){
    super();
    this.state = {
      visible_tab : 'updates',
      travel : [],
      added_travel : [],
      reviews : [],
      added_reviews : [],
      cats : [],
      added_cats :[],
      favs : []
    }
    this.get_api_load_data();
  }

  /* Function passed as props to reviews component. 
   * Component allows user to click to view new reviews arriving on socket.
   * Combines new and exsisting reviews to be displayed together
   */
  show_more_reviews = () => {
    var combined_reviews = this.state.added_reviews.concat(this.state.reviews);
    this.setState({ reviews : combined_reviews,added_reviews : [] });
  }
  /* Handle socket messages on receipt of new item. */
  componentDidMount(){
    var main = this;
    travel_messages((err, load) => {
      var new_travel = main.state.added_travel; new_travel.unshift(load.data);
      main.setState({added_travel : new_travel })
     });

    reviews((err, load) => {
      var new_reviews = main.state.added_reviews; new_reviews.unshift(load.data);
      main.setState({added_reviews : new_reviews })
     });

    gifs((err, load) => {
      var new_gifs = main.state.added_cats; new_gifs.unshift(load.data);
      main.setState({added_cats : new_gifs });
    });
  }
  /* Star item, function passed to tab components and called from within components */
  star = (type,id,item) => {
    var main = this;
    fetch(server_domain+'/star', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data_type : type,
        data_id:  id
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson && responseJson.success){
        item.type = type;
        var fav = main.state.favs;fav.unshift(item);
        main.setState({favs : fav});
      }
    }).catch((error) => {
      console.error(error);
    })
  }

  /* Get inital data from server + assign to state variable */
  get_api_load_data(){
    var main = this;
    fetch(server_domain+'/sync', {
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

  /* Change current visible tab - managed as state variable */
  change_visible_tab (change_to){
    this.setState( {visible_tab : change_to });
  }

  /* Render menu to toggle between tabs */
  _render_menu(){
    var update_active = this.state.visible_tab === 'updates' ? 'active' : '';
    var reviews_active = this.state.visible_tab === 'reviews' ? 'active' : '';
    var cats_active = this.state.visible_tab === 'cats' ? 'active' : '';
    var favs_active = this.state.visible_tab === 'favs' ? 'active' : '';
    return (
      <div className='menu'>
        <div className={'tab '+ update_active} onClick={ (e) => this.change_visible_tab('updates')} >Updates</div>   
        <div className={'tab '+ reviews_active} onClick={ (e) => this.change_visible_tab('reviews')} >Reviews</div>   
        <div className={'tab '+ cats_active} onClick={ (e) => this.change_visible_tab('cats')} >Cats!</div>
        <div className={'tab '+ favs_active} onClick={ (e) => this.change_visible_tab('favs')} >Favs</div>
      </div>
    );
  }

  /* Render currently visible componenet tab */
  _render_current_tab(){
    var main = this;
    switch(this.state.visible_tab){
      case 'updates':
        return (<Feed star={this.star} added={this.state.added_travel} data={this.state.travel}/>)
      case 'reviews': 
        return (<Reviews star={this.star} show_more={this.show_more_reviews} added={this.state.added_reviews} data={main.state.reviews}/>);
      case 'cats' : 
        return (<Cats star={this.star} added={this.state.added_cats} data={this.state.cats}/>);
      case 'favs' : 
        return (<Favs data={this.state.favs}/>);
      default:
        return (<Feed star={this.star} added={this.state.added_travel} data={this.state.travel}/>)
    }
  }

  
  render() {
    return (
      <div className="App">
        <div className="feed-heading">
          <img src={logo} className="" alt="london skyline" />
          <h2>The Feed</h2>
        </div>
        <div>
         { this._render_menu() }
         { this._render_current_tab() }
        </div>
      </div>
    );
  }
}

export default App;
