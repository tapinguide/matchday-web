import React from 'react';
import { ExpanderContent } from 'pui-react-expander';
import shapegreendown from './images/shapegreendown.svg';
import shapegreenup from './images/shapegreenup.svg';
import pitchIcon from './images/pitch@2x.png';
import tvIcon from './images/TV@2x.png';
import EventCard from '../EventCard';

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
    if(tvDetails != null && venue != null && tvDetails.length > 0 && venue.length > 0)
    {
      return (
        <tv-venue>
          <div className='tv-venue'>
            <div
              className='tv-venue-icon'
              style={{backgroundImage: "url(" + tvIcon + ")"}}
            >
              TV:
            </div>
            <div className="tv-venue-text">
              {tvDetails}
            </div>
          </div>
          <div className ='tv-venue'>
            <div
              className='tv-venue-icon'
              style={{backgroundImage: "url(" + pitchIcon + ")"}}
            >
              Venue:
            </div>
            <div className="tv-venue-text">
              {venue}
            </div>
          </div>
        </tv-venue>
      )
    }
    else if(tvDetails != null && tvDetails.length > 0){
      return (
        <div className='tv-venue'>
          <div className='tv-venue-icon'>
            <img src={tvIcon} alt="TV" />
          </div>
          {tvDetails}
        </div>
      )
    }
    else if(venue != null && venue.length > 0){
      return (
        <div className='tv-venue'>
          <div className='tv-venue-icon'>
            <img src={pitchIcon} alt="Venue" />
          </div>
          {venue}
        </div>
      )
    }
    else{
      return <div></div>
    }
  }

  getTimelineEvents(events){
    if(events.length === 0)
    {
      return <div className="live-match-data">Live match data to come </div>;
    }
    else
    {
      var timelineEvents = [];
      events.forEach(function(event, index) {
        if(event.eventType === "yellowcard"
          || event.eventType === "yellowred"
          || event.eventType === "redcard"
          || event.eventType === "subst"
          || event.eventType === "goal"
          || event.eventType === "pen miss")
        {
          if(index > 0){
            timelineEvents.push(<div key={index + '-' + event.id}><div className="timeline" key={event.id + index}></div><EventCard event={event} key={event.id} /></div>);
          }
          else
          {
            timelineEvents.push(<EventCard event={event} key={event.id} />);
          }
        }
      });

      return timelineEvents;
    }
  }
  render() {
    const {
      events,
      expandedState,
      onExited,
      tvDetails,
      venue,
    } = this.props;

    var content = (
      <timeline-events>
        <div className={this.getClass(expandedState)} style={this.getBackgroundImage(expandedState)} ></div>
        <ExpanderContent
          expanded={expandedState}
          onExited={() => onExited()}
        >
          {this.getTVVenueDetails(tvDetails, venue)}
          {this.getTimelineEvents(events)}
        </ExpanderContent>
      </timeline-events>
    );
    return content;
  }
}

