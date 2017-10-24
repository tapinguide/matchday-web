import React from 'react';
import EventCard from './EventCard';
// import Goal from './Goal';
import Substitute from './Substitute';
import MissedPK from './MissedPK';

class Event extends React.Component {

    getEventType(event, index){
        if(event.eventType === "yellowcard" || event.eventType === "yellowred" ){
            return <EventCard event={event} />;
        }
        else if(event.eventType === "redcard"){
             return <EventCard event={event} />;
        }
        else if(event.eventType === "goal"){
             return <EventCard event={event} />;
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
