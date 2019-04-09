import React, { Component } from 'react';

class ProgressBar extends Component {

    componentDidMount(){
        TweenMax.to(this.progressbar, .25, {height:10, ease:'Power2.easeOut'})
    }
    render() {
        const {percentage} = this.props;

        return (
            <div className="progress-bar" ref={(el) => { this.progressbar = el; }}>
                <div className="filler" style={{width: `${percentage}%`}}></div>
            </div>
        );
    }
}

export default ProgressBar;