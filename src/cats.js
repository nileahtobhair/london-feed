import React, { Component } from 'react';
import './index.css';

class cats extends Component {

  constructor(props){
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className="gifs">
        { 
          this.props.added.map((item,index)=>{ 
            return (
              <a target="_blank" key={'added-cat'+index} href={item.html5_source} ><img src={item.gif_source} alt='a cat gif'/></a>
            
            );
          })  
       }
        { 
          this.props.data.map((item,index)=>{ 
            return (
              <a target="_blank" key={'cat'+index} href={item.html5_source} ><img src={item.gif_source} alt='a cat gif'/></a>
            );
          })  
       }
      </div>
    );
  }
}

export default cats;
