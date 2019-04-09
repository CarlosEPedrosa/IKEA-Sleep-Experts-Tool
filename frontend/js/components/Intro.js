
import React, { Component } from 'react';

class Intro extends Component {

    componentDidMount(){
        TweenMax.fromTo(this.arrow, .5, {x:50, height:30, width:0}, {x:0, height:30, width:150, delay:1, ease:"Power2.easeOut"});
    }

    render() {

        const {heading, content} = this.props;

        return (
            <div className="inner-intro">
                <h3>{ heading }</h3>
                <p>{ content }</p>
                <div className="intro-arrow" ref={(el) => { this.arrow = el; }}></div>
            </div>
        );
    }
}

export default Intro;