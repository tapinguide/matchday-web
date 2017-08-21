import React from 'react';
import YellowCard from './YellowCard';
import RedCard from './RedCard';
import Goal from './Goal';
import Substitute from './Substitute';

class Event extends React.Component {
 
    getEventType(event, index){
        if(event.eventType === "yellowcard" || event.eventType === "yellowred"){
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
        var eventType = this.getEventType(this.props.event, this.props.index);
        return (
            <div>
                {eventType}
            </div>
        )
    }
}

export default Event;
