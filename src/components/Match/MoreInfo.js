import React from 'react';
import {ExpanderContent} from 'pui-react-expander';
import shapegreendown from './images/shapegreendown.svg'
import shapegreenup from './images/shapegreenup.svg'
import Event from './Event/Event';
import './Event/css/event.css';

class MoreInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false};
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
            return "expander expanderopen";
        }
        else{
            return "expander expanderclosed";
        }
    }
    render() {

        var events = [];
        this.props.events.forEach(function(event, index) {
            if(index > 0){
                events.push(<div key={index + '-' + event.id}><div className="timeline" key={event.id + index}></div><Event event={event} key={event.id} /></div>);
            }
            else
            {
                events.push(<Event event={event} key={event.id} />);
            }
            
        });

        var content = <main></main>;
        if(events.length > 0){
            content = (
                <main>
                    <div className={this.getClass(this.state.expanded)} style={this.getBackgroundImage(this.state.expanded)} onClick={() => this.expandCollapse(this.state.expanded)}></div>
                    <ExpanderContent expanded={this.state.expanded} >
                        {events}
                    </ExpanderContent>
                </main>
            );
        }

        return content;
    }
}

export default MoreInfo;

