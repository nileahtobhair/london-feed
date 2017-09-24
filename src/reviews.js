import React, { Component } from 'react';
import './index.css';

class reviews extends Component {
   /* Set intial  */
  constructor(props){
    super();
    console.log('inside feed ',props.data);
    this.state = {
    }
  }

  render() {
    return (
      <div className="review">
        { this.props.data.map((item,index)=>{
          console.log('mapping reviews',item);
          return (
            <div className='review-item' key={'item'+index}>
              <img className='review-location-image' src={item.image_url} alt='review location' />
              <div className='review-data'>
                <h4>{item.name}</h4>
                <div>Rating <span> {item.rating}</span></div>
                <div>Number of Reviews <span> {item.review_count}</span></div>
                <div>Phone Number<span> {item.display_phone}</span></div>
                <div><a target="_blank" href={item.url}>URL</a></div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default reviews;
