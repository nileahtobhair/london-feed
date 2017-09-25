import React, { Component } from 'react';
import './index.css';
import moment from 'moment';

class Feed extends Component {

  /* Render relevant information for individual travel update. */
  _render_travel_update(item,index){
    return (
      <span>
        <img src={item.user.profile_image_url_https} alt='update user profile'/>
          <div className='information'>
            <div className='date'>
              <span className='time'> {moment(item.created_at).format("HH:mm")}</span>
              { moment(item.created_at).format("DD MMM YY") }
            </div>
            <div className='text'>{item.text}</div>
            <div className='star' onClick={ (e) => this.props.star('travel',item.id_str,item)} > Star this item</div>
          </div> 
      </span>
    );
  }

  /* Map intital updates and updates gathered from socket streams separately.*/
  render() {
    return (
      <div className="travel">
        <ul>
         { this.props.added.map((item,index)=>{
          return (
            <li className='added-update' key={'added-update'+index}>
               {this._render_travel_update(item,index)}
            </li>
          )
        })}
         </ul>
         <ul>
        { this.props.data.map((item,index)=>{
          return (
            <li className='update' key={'update'+index}>
              {this._render_travel_update(item,index)}
            </li>
          )
        })}
        </ul>
      </div>
    );
  }
}

export default Feed;