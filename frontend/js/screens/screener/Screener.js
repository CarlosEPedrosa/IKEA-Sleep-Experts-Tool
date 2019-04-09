import React, { Component } from 'react'

import ScreenContent from "../common/ScreenContent"
import ScreenerVisual from "./ScreenerVisual"
import { isMobile } from "react-device-detect";
import Screens from "../Screens"
import ProgressBar from "./ProgressBar"

class Screener extends Component {

    constructor(){
        super();

        this.state = {
            currentpage: 0,
            currentvalue: "A",
            options:[],
            loading:true,
            percentage:0
        }

        this.onPageChange = this.onPageChange.bind(this);
        this.onImageLoadedHandler = this.onImageLoadedHandler.bind(this);
        this.onClickFromEndScreen = this.onClickFromEndScreen.bind(this);

        this.onReplayHandler = this.onReplayHandler.bind(this);
        this.onBackHandler = this.onBackHandler.bind(this);
        
        this._srcOnly = [];
        this._domDummies = [];
        this._visuals = [];
        this._totalSteps = 0;
        this._totalLoaded = 0;
    }

    onImageLoadedHandler(e){        
        
        if(this._totalLoaded === this._visuals.length-1){
            setTimeout(()=>{
                this._domDummies = [];
                this.setState({
                    loading: false
                })
            },2000);
        }

        this._totalLoaded++;
    }

    onReplayHandler(){
        this.setState({
            currentpage: 0,
            percentage: 0
        })
    }

    onBackHandler(){
        if(this.state.currentpage > 0){
            this.setState({
                currentpage: this.state.currentpage-1,
                percentage:  ((this.state.currentpage-1)* 100) / this._totalSteps
            })
        }
    }

    componentWillMount(){
        let _visualsData = this.props.visuals;
        this._visuals = [];

        this._totalSteps = this.props.screens.length;
        
        for(var i = 0; i < _visualsData.length; i++ ){
            let un = String("visual"+_visualsData[i].screen);
            if(_visualsData[i].screen === 2){
                this._domDummies.push(<img className={ un+" lower" } onLoad={(e) => this.onImageLoadedHandler(e, this)} src= { window.pfinder.assetPath + "images/screener/" + (isMobile ? _visualsData[i].mobile : _visualsData[i].svg) } />);
            }else{
                this._domDummies.push(<img className={un} onLoad={(e) => this.onImageLoadedHandler(e, this)} src= { window.pfinder.assetPath + "images/screener/" + _visualsData[i].svg } />);
            }
            this._visuals.push( { screen: _visualsData[i].screen, variant: _visualsData[i].variant, svg: this._domDummies[i] } );
        }
    }

    onClickFromEndScreen(label){

        switch(label){
            case Screens.COMFORT: this.setState({currentpage:8});
                            break;
            case Screens.LIGHT: this.setState({currentpage:9});
                            break;
            case Screens.TEMPERATURE: this.setState({currentpage:10});
                            break;
            case Screens.NOISE: this.setState({currentpage:11});
                            break;
            case Screens.AIR: this.setState({currentpage:12});
                            break;
        }
    }

    onPageChange(clickData){

        let _newOptions = this.state.options;
        let _oldPage = this.state.currentpage;
        _newOptions.splice(_oldPage, 0, clickData.value);

        if(clickData.destination === "essentials"){
            
            this.setState(
                {
                    options: _newOptions,
                    currentvalue: clickData.value,
                    currentpage: 7,
                    percentage: 100
                },()=>{
                    if(isMobile){
                        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                        if( h < 622 && h > 0){
                            document.documentElement.scrollTop = 80;
                        }
                    }
                    
                    TweenMax.to(this.container, .25, {autoAlpha:1, delay:1, onComplete:()=>{
                        this.props.onChangeScreen(String(clickData.destination).toLowerCase(), {options: _newOptions, visuals: this._visuals});
                    }});
                })
        }else{

            ga("send", {
                hitType: "event",
                eventCategory: "Options",
                eventAction: clickData.value,
                eventLabel: String(_oldPage)
            });
            
            
            this.setState(
                {
                    options: _newOptions,
                    currentvalue: clickData.value,
                    currentpage: clickData.destination,
                    percentage: (Number(clickData.destination) * 100) / this._totalSteps
                },()=>{
                    if(isMobile){
                        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                        if( h < 622 && h > 0){
                            document.documentElement.scrollTop = 80;
                        }
                    }
                }
            )
        }
    }

    render() {

        const { screens } = this.props;

        let backButton = <span></span>;
        if(this.state.currentpage > 0 && this.state.currentpage < 7) backButton = <div className="control back" onClick={()=>{ this.onBackHandler() }}></div>

        let replayButton = <span></span>;
        if(this.state.currentpage > 0) replayButton = <div className="control replay" onClick={()=>{ this.onReplayHandler() }}></div>

        let loading = (<div id="loading"><div className="loader">Loading...</div><div style={{position:"absolute", overflow:"hidden", opacity:0.01, width:"100%", height:"100%"}}> { this._domDummies } </div> </div>);

        return (
                <div id="screener-screen">

                {
                    this.state.loading ?
            
                    loading
                
                    :
                    <div>
                        <ProgressBar percentage={this.state.percentage}/>
                        <div className="controls">
                            {replayButton}
                            {backButton}
                        </div>
                        <div className="debug">{ 'Screener : ' + this.state.currentpage }</div>
                        <div className="center-content" ref={(el)=>{ this.container = el; }}>
                            <div className="half-content left">
                                <ScreenerVisual visuals={ this._visuals } screens={screens} currentpage={ this.state.currentpage } currentvalue={ this.state.currentvalue }/>
                            </div>

                            <div className="half-content right">
                            { this.state.currentpage === 7 
                            
                            ?
                            
                            <div className="inner-loading"><div className="loader">Loading...</div></div>

                            :

                            <ScreenContent currentpage={ this.state.currentpage } screens={screens} onPageChange={ this.onPageChange } />
                            
                            }
                                
                            </div>
                        </div>
                          
                    </div>
                }
                </div>
        );
    }
}

export default Screener;