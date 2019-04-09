import React, { Component } from 'react'
import Screens from '../Screens'
import EssentialOptions from './EssentialOptions'
import ScreenContent from '../common/ScreenContent'

class Essentials extends Component {

    constructor(props){
        super(props);
        this.state ={
            visuals: [],
            currentpage: 0,
            currentpriority: 0,
            className: ""
        }

        this.onReplayHandler = this.onReplayHandler.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onOptionsChange = this.onOptionsChange.bind(this);
    }

    componentDidMount(){        
        const { options, visuals, isFirst } = this.props;
        
        let _visuals = [];

        for (let i = 0; i < options.length; i++) {
            const option = options[i];            

            for (let j = 0; j < visuals.length; j++) {
                const visual = visuals[j];

                if(visual.variant===option && visual.screen === (i+1)){
                    _visuals.push(visual.svg);
                }
            }
        }
        
        if(options[0] !== "C"){
            _visuals.unshift(visuals[0].svg)
        }
        
        _visuals.push(<EssentialOptions key="EO" options={ options } onOptionsChange={(screen, priority)=>{ this.onOptionsChange(screen, priority) }}/>)

        this.setState({
            visuals: _visuals,
            currentpage: 0,
            className: isFirst ? "" : "animate"
        })
    }

    onPageChange(ctaData){
        console.dir(ctaData);
        
        ga("send", {
            hitType: "event",
            eventCategory: "Essentials",
            eventAction: "click",
            eventLabel: ctaData.destination
        });

        this.props.onChangeScreen(ctaData.destination);
    }

    onOptionsChange(screen, priority){

        const { screens } = this.props;

        for (let i = 0; i < screens.length; i++) {
            const element = screens[i];

            if(element.type === "marker"){
                if(element.ctas[0].destination === screen){
                    this.setState({
                        currentpage: i,
                        currentpriority: priority
                    })
                    break;
                }
            }
            
        }
    }

    onReplayHandler(){
        ga("send", {
            hitType: "event",
            eventCategory: "Interaction",
            eventAction: "Essentials replay",
            eventLabel: "Essentials replay"
        });

        this.props.onChangeScreen(Screens.SCREENER);
    }

    render() {

        const { screens } = this.props;

        return (
            <div className="essentials">
                <div className="controls">
                        <div className="control replay" onClick={ ()=>{ this.onReplayHandler() }}></div>
                </div>
                <div className="debug">{ 'Essentials : 0' }</div>
                <div className="center-content" >
                    <div className="half-content left">
                        <div className={"screener-visual " + this.state.className }>
                            { this.state.visuals }
                        </div>
                    </div>
                    <div className="half-content right">
                        <ScreenContent currentpage={ this.state.currentpage } priority={ this.state.currentpriority } screens={screens} onPageChange={ (screen) => { this.onPageChange(screen) }} />
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Essentials;