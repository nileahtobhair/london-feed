import React, { Component } from 'react';
import './index.css';
import moment from 'moment';

class Feed extends Component {
   /* Set intial  */
  constructor(props){
    super();
  }

  render() {
    return (
      <div className="travel">
        <ul>
         { this.props.added.map((item,index)=>{
          console.log('mapping adding updates',item);
          return (
            <li className='added-update' key={'added-update'+index}>
              <div className='data'>{item.created_at}</div>
              <div className='  '>{item.text}</div>
              <img src={item.user.profile_image_url_https} alt='update user profile'/>
            </li>
          )
        })}
         </ul>
         <ul>
        { this.props.data.map((item,index)=>{
          console.log('mapping updates',item);
          return (
            <li className='update' key={'update'+index}>
              <img src={item.user} />
              <div className='data'>{item.created_at}</div>
              <div className='  '>{item.text}</div>
              <img src={item.user.profile_image_url_https} alt='update user profile'/>
            </li>
          )
        })}
        </ul>
      </div>
    );
  }
}

export default Feed;