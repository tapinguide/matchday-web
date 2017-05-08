import React from 'react';
import YellowCard from './YellowCard';
import RedCard from './RedCard';
import Goal from './Goal';
import Substitute from './Substitute';

class Card extends React.Component {
 
    getEventType(event){
        if(event.eventType === "yellowcard"){
            return <YellowCard event={event} />;
        }
        else if(event.eventType === "redcard"){
             return <RedCard event={event} />;
        }
        else if(event.eventType === "goal"){
             return <Goal event={event} />;
        }
        else if(event.eventType === "subst"){
             return <Substitute event={event} />;
        }
    }
    render() {
        var eventType = this.getEventType(this.props.event);
        return (
            <event>
                <div className="timeline"></div>
                {eventType}
            </event>
        )
    }
}

export default Card;
