import React from 'react';
import renderHTML from 'react-render-html';
import './css/mustreadwatch.css';

export default class MustReadWatch extends React.Component {
    openWindow(url){
        window.open(url,'_blank');
    }
    render() {
        var link = this.props.link;
        var header = this.props.header;
        var icon = this.props.icon;
        var content = (
            <div className="match-container">
                <div className="match w-clearfix has-expander link" onClick={() => this.openWindow(link.url)}>
                    <div className="contentcontainer w-clearfix must-read">
                        <div className="header">
                            {header}
                        </div>
                        <div className="must-read-body">
                            <div className="icon">
                                <img alt={header} src={icon} />
                            </div>
                            <div className="text">
                                {renderHTML(link.text)}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            );

        return content;
    }
}
