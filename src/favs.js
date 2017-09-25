import React, { Component } from 'react';
import './index.css';

class favs extends Component {

  /* Render favourites by type*/
  _render_favourite(item){
    switch(item.type){
      case 'travel':
        return (<div><span className='fav-title'>Travel Update</span> {item.text}</div>);
      case 'reviews': 
        return (
          <div className=''><span className='fav-title'>Reviews</span> <span>{item.name}</span> <span className='rating'> {item.rating}</span>
            <span><a target="_blank" href={item.url}>URL</a></span>
          </div>);
      case 'gifs' :
        return (<span><span className='fav-title'>Cat Gifs</span><a target="_blank" href={item.html5_source} >{item.gif_source}</a></span>); 
      default :
        return (<span></span>);
    }
  }

  /*Display favourites */
  render() {
    return (
      <div className="favs">
        { this.props.data.map((item,index)=>{ 
          return (
            <span className='fav-item' key={'favs'+index}>
            {this._render_favourite(item)}
            </span>
          );
          })}
      </div>
    );
  }
}

export default favs;
