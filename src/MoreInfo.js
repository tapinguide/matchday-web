import React from 'react';
import {ExpanderContent} from 'pui-react-expander';
import shapegreen from './images/shapegreen.svg'
import shapegreenup from './images/shapegreenup.svg'
import Card from './Card';

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
    getClass(value){
        if(value){
            return "expander expanderopen";
        }
        else{
            return "expander";
        }
    }
    render() {

        var cards = [];
        this.props.events.forEach(function(event) {
            cards.push(<Card event={event} key={event.id} />);
        });

        return (
        <main>
            <ExpanderContent expanded={this.state.expanded}>
                {cards}
            </ExpanderContent>
            <div className={this.getClass(this.state.expanded)} style={this.getBackgroundImage(this.state.expanded)} onClick={() => this.setState({expanded: !this.state.expanded})}></div>
        </main>
        )
    }
}

export default MoreInfo;

