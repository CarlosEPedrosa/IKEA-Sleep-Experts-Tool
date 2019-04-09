import React, { Component } from 'react'
import ScreenContent from "../common/ScreenContent"
import ScreenVisual from "../common/ScreenVisual"
import Screens from "../Screens"
import { isMobile } from "react-device-detect";

class Screen extends Component {

    constructor(){
        super();

        this.state = {
            currentpage: 0,
            previouspage: [],
            content:[]
        }

        this.onHomeHandler = this.onHomeHandler.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.build = this.build.bind(this);
    }

    _handleImageLoadError(data){
        console.log("_handleImageLoadError ", data);
    }

    _handleImageLoadSuccess(data){
        console.log("_handleImageLoadSuccess ", data);
    }

    onHomeHandler(){
        this.props.onChangeScreen(Screens.ESSENTIALS);
    }

    onBackHandler(){
        TweenMax.to(this.container, .25, {autoAlpha:0, onComplete:()=>{
            if(this.state.currentpage > 0){
                    this.setState({
                        currentpage: this.state.previouspage.pop(),
                        content:[]
                    },()=>{
                        this.build();
                    })   
            }else{
                this.props.onChangeScreen(Screens.ESSENTIALS);
            }
        }});
    }

    onPageChange(ctaData){

        const { currentpage } = this.state;

        if(ctaData.destination !== currentpage){
            if(ctaData.destination === Screens.ESSENTIALS){
                this.props.onChangeScreen(Screens.ESSENTIALS);
            }else{
                let _previouspage = this.state.previouspage;
                if(this.container !== null){
                    TweenMax.to(this.container, .25, {autoAlpha:0, onComplete:()=>{
                        
                        _previouspage.push(currentpage);

                        this.setState({
                            currentpage: ctaData.destination,
                            previouspage: _previouspage
                        },()=>{
                            this.build();
                            if(this.container !== null)TweenMax.to(this.container, .25, {autoAlpha:1});
                        })
                    }})
                }
            }
        } else {
                _previouspage.push(currentpage);

                this.setState({
                    currentpage: ctaData.destination,
                    previouspage: _previouspage
                },()=>{
                    this.build();
                });
        }
    }

    build(){
        let _content = [];
        const { screens } = this.props;
        if(String(screens[this.state.currentpage].type).toLowerCase() !== "product"){
            _content.push(
                <div className="screen-inner-content">
                    <div className="center-content" ref={ (el) => { this.container = el; } }>
                        <div className="half-content left">
                            <ScreenVisual screens={screens} currentpage={ this.state.currentpage } pathPrefix={ this.props.pathPrefix }/>
                        </div>
                        <div className="half-content right">
                            <div className="inner-content">
                                <ScreenContent currentpage={ this.state.currentpage } screens={screens} onPageChange={ this.onPageChange } />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            _content.push(
                <ScreenContent currentpage={ this.state.currentpage } screens={screens} onPageChange={ this.onPageChange } />
            )
        }

        this.setState({
            content: _content
        },()=>{
            if(isMobile){
                document.documentElement.scrollTop = 0;
            }       
            if(this.container)TweenMax.to(this.container, .25, {autoAlpha:1});
        })
    }

    componentWillMount(){

    }

    componentDidMount(){
        this.build();
    }

    render() {

        return (
                <div className="screen">
                    <div className="controls">
                        <div className="control back" onClick={()=>{ this.onBackHandler() }}></div>
                    </div>
                    <div className="debug">{ this.props.name + ' : ' + this.state.currentpage }</div>
                    <div className='screen-content' ref={(el)=>{ this.container = el; }}>
                        { this.state.content }
                    </div>
                </div>
        );
    }
}

export default Screen;