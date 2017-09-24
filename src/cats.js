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
        { this.props.data.map((item,index)=>{ 
          return (
            <img key={'cat'+index} src={item.gif_source} alt='a cat gif'/>
          );
        })  
      }
      </div>
    );
  }
}

export default cats;
