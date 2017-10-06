import React from 'react';

class Crest extends React.Component {

    onClick() {
        this.props.onSetParentWallpaper(this.props.club.crest);
    }

    render() {
        var club = this.props.club;
        return (
            <div className="crest w-preserve-3d" onClick={this.onClick.bind(this)}>
                <img className="image-2" src={club.crest} alt={club.name}  />
                <div className="text-block-3">{club.name}</div>
                </div>
            );
        }
}

export default Crest;
