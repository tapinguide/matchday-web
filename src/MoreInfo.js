import React from 'react';
import {ExpanderContent} from 'pui-react-expander';
import shapegreen from './images/shapegreen.svg'
import shapegreenup from './images/shapegreenup.svg'
import Card from './Card';
import './css/event.css';

class MoreInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false};
    }
    getBackgroundImage(value){
        var expanderStyle = '';
        if(!value){
            expanderStyle = {
                backgroundImage: "url(" + shapegreen + ")"
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

        var cards = [];
        this.props.events.forEach(function(event) {
            cards.push(<Card event={event} key={event.id} />);
        });

        var content = <main></main>;
        if(cards.length > 0){
            content = (
                <main>
                     <div className={this.getClass(this.state.expanded)} style={this.getBackgroundImage(this.state.expanded)} onClick={() => this.expandCollapse(this.state.expanded)}></div>
                    <ExpanderContent expanded={this.state.expanded}>
                        {cards}
                    </ExpanderContent>
                </main>
            );
        }

        return content;
    }
}

export default MoreInfo;

