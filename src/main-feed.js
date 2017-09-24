import React, { Component } from 'react';
import './index.css';
import moment from 'moment';

class Feed extends Component {
  
  render() {
    return (
      <div className="travel">
        <ul>
         { this.props.added.map((item,index)=>{
          return (
            <li className='added-update' key={'added-update'+index}>
              <img src={item.user.profile_image_url_https} alt='update user profile'/>
              <div className='information'>
                <div className='date'>
                  <span className='time'> {moment(item.created_at).format("HH:mm")}</span>
                  { moment(item.created_at).format("DD MMM YY") }
                </div>
                <div className='text'>{item.text}</div>
              </div>   
            </li>
          )
        })}
         </ul>
         <ul>
        { this.props.data.map((item,index)=>{
          return (
            <li className='update' key={'update'+index}>
              <img src={item.user.profile_image_url_https} alt='update user profile'/>
              <div className='information'>
                <div className='date'>
                  <span className='time'> {moment(item.created_at).format("HH:mm")}</span>
                  { moment(item.created_at).format("DD MMM YY") }
                </div>
                <div className='text'>{item.text}</div>
              </div> 
            </li>
          )
        })}
        </ul>
      </div>
    );
  }
}

export default Feed;