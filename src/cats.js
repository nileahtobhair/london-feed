import React, { Component } from 'react';
import './index.css';

class cats extends Component {

  /* Map intital gifs and gifs gathered from socket streams separately. 
     Gifs are displayed in gallery as link to sourcec*/
  render() {
    return (
      <div className="gifs">
        { this.props.added.map((item,index)=>{ 
            return (
              <span key={'added-cat'+index}>
                <a target="_blank" href={item.html5_source} ><img src={item.gif_source} alt='a cat gif'/></a>
                <div className='star' onClick={ (e) => this.props.star('travel',item.id)} > Star this item</div>
              </span>
            );
          })}
        { this.props.data.map((item,index)=>{ 
            return (
              <span key={'cat'+index}>
                <a target="_blank" href={item.html5_source} ><img src={item.gif_source} alt='a cat gif'/></a>
                <div className='star' onClick={ (e) => this.props.star('travel',item.id)} > Star this item</div>
              </span>
            );
          })}
      </div>
    );
  }
}

export default cats;
