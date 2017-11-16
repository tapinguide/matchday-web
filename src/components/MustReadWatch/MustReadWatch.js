import React from 'react';
import renderHTML from 'react-render-html';
import './css/mustreadwatch.css';
import mustReadIcon from './images/mustread.png'
import mustWatchIcon from './images/mustwatch.png'

export default class MustReadWatch extends React.Component {
    openWindow(url){
        window.open(url,'_blank');
    }
    render() {
        var mustReadLink = this.props.link;
        var header = mustReadLink.header;
        var icon;
        if(mustReadLink.mustType === 'read'){
            icon = mustReadIcon;
        }
        else{
            icon = mustWatchIcon;
        }

        var additionalClass = this.props.additionalClass;
        var content = (
            <div className={"match-container " + additionalClass}>
                <div className="match has-expander link" onClick={() => this.openWindow(mustReadLink.url)}>
                    <div className="content-container must-read">
                        <div className="header">
                            {header}
                        </div>
                        <div className="must-read-body">
                            <div className="icon">
                                <img alt={header} src={icon} />
                            </div>
                            <div className="text">
                                {renderHTML(mustReadLink.text)}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            );

        return content;
    }
}
