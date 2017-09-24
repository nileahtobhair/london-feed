import React, { Component } from 'react';
import './index.css';

class reviews extends Component {

  constructor(props){
    super();
    this.state = {
      show_more : false
    }
  }

  render() {
    return (
      <div className="review">
        { this.state.show_more ?
        <ul>
         { this.props.added.map((item,index)=>{
          return (
            <li className='review-item' key={'item'+index}>
              <div className='review-img-container'>
                <img className='' src={item.image_url} alt='review location'/>
              </div>
              <div className='review-data'>
                <h2>{item.name}</h2>
                <div>Rating <span> {item.rating}</span></div>
                <div>Number of Reviews <span> {item.review_count}</span></div>
                <div>Phone Number<span> {item.display_phone}</span></div>
                <div><a target="_blank" href={item.url}>URL</a></div>
              </div>
            </li>
          )
        })}
         </ul>
        : 
        <span>
          { this.props.added.length > 0 ?
            <div className='show-more' onClick={ (e) => this.props.show_more()}>Show {this.props.added.length} more</div> 
          : null }
        </span>
        }

        { this.props.data.map((item,index)=>{
          return (
            <div className='review-item' key={'item'+index}>
              <div className='review-img-container'>
                <img className='' src={item.image_url} alt='review location'/>
              </div>
              <div className='review-data'>
                <h2>{item.name}</h2>
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
