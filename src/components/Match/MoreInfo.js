import React from 'react';
import {ExpanderContent} from 'pui-react-expander';
import shapegreendown from './images/shapegreendown.svg'
import shapegreenup from './images/shapegreenup.svg'
import Event from './Event/Event';
import './Event/css/event.css';

export default class MoreInfo extends React.Component {
    getBackgroundImage(value){
        var expanderStyle = '';
        if(!value){
            expanderStyle = {
                backgroundImage: "url(" + shapegreendown + ")"
            }
        }
        else{
            expanderStyle = {
                backgroundImage: "url(" + shapegreenup + ")"
            }
        }
        
        return expanderStyle;
    }
    expandCollapse(value){
        this.setState({expanded: !value});
    }
    getClass(value){
        if(value){
            return "expanderopen";
        }
        else{
            return "expanderclosed";
        }
    }
    getTVVenueDetails(tvDetails, venue){
        
        if(tvDetails.length > 0 && venue.length > 0)
        {
            return (
                <tv-venue>
                    <div className='tv-venue'>
                        <div className='tv'>TV:</div> {tvDetails}
                    </div>
                    <div className ='tv-venue'>
                        <div className='tv'>Venue:</div> {venue}
                    </div>
                </tv-venue>
            )
        }
        else if(tvDetails.length > 0 && venue.length === 0){
            return <div className='tv-venue'><div className='tv'>TV:</div>  {tvDetails}</div> 
        }
        else if(tvDetails.length === 0 && venue.length > 0){
            return <div className='tv-venue'><div className='tv'>Venue:</div> {venue}</div>
        }
        else{
            return <div></div>
        }
    }
    render() {
        const { events, expandedState, tvDetails, venue } = this.props;

        var timelineEvents = [];
        events.forEach(function(event, index) {
            if(index > 0){
                timelineEvents.push(<div key={index + '-' + event.id}><div className="timeline" key={event.id + index}></div><Event event={event} key={event.id} /></div>);
            }
            else
            {
                timelineEvents.push(<Event event={event} key={event.id} />);
            }
            
        });

        var content = <main></main>;
        if(timelineEvents.length > 0 || tvDetails.length > 0 || venue.length > 0){
            content = (
                <main>
                    <div className={this.getClass(expandedState)} style={this.getBackgroundImage(expandedState)} ></div>
                    <ExpanderContent expanded={expandedState} >
                        {this.getTVVenueDetails(tvDetails, venue)}
                        {timelineEvents}
                    </ExpanderContent>
                </main>
            );
        }

        return content;
    }
}

