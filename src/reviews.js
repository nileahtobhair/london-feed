import React, { Component } from 'react';
import './index.css';

class reviews extends Component {

  /* Render individual review with revelant information (mapped from props) */
  _render_review(item,index){
    return (
      <span>
        <div className='review-img-container'>
          <img className='' src={item.image_url} alt='review location'/>
        </div>
        <div className='review-data'>
          <h2>{item.name}</h2>
          <div>Rating <span> {item.rating}</span></div>
          <div>Number of Reviews <span> {item.review_count}</span></div>
          <div>Phone Number<span> {item.display_phone}</span></div>
          <div><a target="_blank" href={item.url}>URL</a></div>
          <div className='star' onClick={ (e) => this.props.star('reviews',item.id)} > Star this item</div>
        </div>
      </span>     
    )
  }
 
  render() {
    return (
      <div className="review">
       {/* Show number of new reviews that have been sent through socket .
        * Button click triggers function in parent (app.js) through props
        * that handles data manipulation for display in list below */}
        <span>
          { this.props.added.length > 0 ?
            <div className='show-more' onClick={ (e) => this.props.show_more()}>Show {this.props.added.length} more</div> 
          : null }
        </span>
        {/* Map list of reviews to be displayed */}
        <ul>
          { this.props.data.map((item,index)=>{
            return (
              <li className='review-item' key={'item'+index}>
                 { this._render_review(item,index) }
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default reviews;
