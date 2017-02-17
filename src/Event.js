import React from 'react';

class Event extends React.Component{
  render(){
    return (
    <div className="card">
          <div className="cardheader yellow">
            <div className="gametime">38'</div>
            <div className="headertitle">Yellow Card</div>
          </div>
          <div className="homecrest incard"></div>
          <div className="playernamecard">Zlatan Ibrahimovich</div>
          <div className="timeline"></div>
        </div>
    );
  }
}

export default Event;