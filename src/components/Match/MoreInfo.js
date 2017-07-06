import React from 'react';
import {ExpanderContent} from 'pui-react-expander';
import shapegreendown from './images/shapegreendown.svg'
import shapegreenup from './images/shapegreenup.svg'
import Event from './Event/Event';
import './Event/css/event.css';

class MoreInfo extends React.Component {
    constructor(props) {
        super(props);
    }
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
    render() {
        const { events, expandedState } = this.props;

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
        if(timelineEvents.length > 0){
            content = (
                <main>
                    <div className={this.getClass(expandedState)} style={this.getBackgroundImage(expandedState)} ></div>
                    <ExpanderContent expanded={expandedState} >
                        {timelineEvents}
                    </ExpanderContent>
                </main>
            );
        }

        return content;
    }
}

export default MoreInfo;

