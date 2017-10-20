import React from 'react';
import YellowCard from './YellowCard';
import RedCard from './RedCard';
import Goal from './Goal';
import Substitute from './Substitute';
import MissedPK from './MissedPK';

class Event extends React.Component {

    getEventType(event, index){
        // console.log('event type: ', event.eventType)
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
        else if(event.eventType === "pen miss"){
            console.log('pen?')
             return <MissedPK event={event} />;
        }
        else {

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
