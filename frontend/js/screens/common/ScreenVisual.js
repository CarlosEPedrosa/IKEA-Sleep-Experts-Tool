import React, { Component } from 'react';

import { isMobile } from "react-device-detect";

class ScreenVisual extends Component {

    constructor(props){
        super(props);

        this.state = {
            activeVisual: [],
            bed: null,
            isLoading: true
        }

        this.getVisual = this.getVisual.bind(this);
        this.animate = this.animate.bind(this);
        this.onImageLoadedHandler = this.onImageLoadedHandler.bind(this);
        this.interval = 0;
        this.currentPose = 0;
        this.flag = false;
    }

    componentDidMount(){
        this.getVisual();
    }

    componentWillUnmount(){
        clearTimeout(this.interval);
        this.flag = false;
    }

    animate(){
        let _list = this.innercontainer.children;
        let total = _list.length;
        if(this.currentPose < total-1){
            this.currentPose = this.currentPose + 1;
        }else{
            this.currentPose = 0;
        }
        
        if(_list.length > 1){            
            if(!this.flag){
                this.flag = true;
                TweenMax.set(_list, {opacity:0});
                for (let i = 0; i < _list.length; i++) {
                    if(i === this.currentPose){
                        TweenMax.to(_list[i], .25, {opacity: 1, ease:'Power2.easeOut'});  
                    }else{
                        TweenMax.to(_list[i], .25, {opacity: 0, ease:'Power2.easeOut'});  
                    }
                }
                this.animate();
            }else{
                clearTimeout(this.interval);
                this.interval = setTimeout(()=>{
                    TweenMax.set(_list, {opacity:0});
                    for (let i = 0; i < _list.length; i++) {
                        if(i === this.currentPose){
                            TweenMax.to(_list[i], .25, {opacity: 1, ease:'Power2.easeOut'});  
                        }else{
                            TweenMax.to(_list[i], .25, {opacity: 0, ease:'Power2.easeOut'});  
                        }
                    }
                    this.animate();
                },2000)
            }
        }else{
            clearTimeout(this.interval);
            TweenMax.to(_list[0], .25, {opacity: 1, ease:'Power2.easeOut'});  
        }

        this.setState({
            isLoading: false
        })
        
    }

    componentDidUpdate(prevProps, prevState){
        
        if(prevProps.currentpage !== this.props.currentpage){
            this.setState({
                isLoading:true
            })
            this.getVisual();
        }

    }

    onImageLoadedHandler(e, scope){
        this.animate();
    }

    getVisual(){
        const { currentpage, screens } = this.props;

        if(screens[currentpage].includeBed){
            this.setState({bed: <img key={ Math.random()*5 } onLoad={(e) => this.onImageLoadedHandler(e, this)} src={ window.pfinder.assetPath + (isMobile?"images/common/bed-mobile.png":"images/common/bed-mobile.png") } />})
        } 

        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            
            if(currentpage === screen.id){
                if(screen.visual.length > 1){
                    // return animated visual
                    this.getAnimatedVisual(screen.visual)
                }else{
                    //return single visual
                    if(screen.mobile){
                        if(screen.mobile != "" && isMobile){
                            this.getSingleVisual(screen.mobile[0]);
                        }else{
                            this.getSingleVisual(screen.visual[0]);
                        }
                    }else{
                        this.getSingleVisual(screen.visual[0]);
                    }
                    
                }
            }
        }
        
    }

    getAnimatedVisual(visuals){
        let els = [];
        
        for (let i = 0; i < visuals.length; i++) {
            els.push(<img onLoad={(e) => this.onImageLoadedHandler(e, this)} src={ window.pfinder.assetPath + this.props.pathPrefix + visuals[i] } />);
        }
            
        this.setState({
            activeVisual: [els]
        },()=>{
            let _list = this.innercontainer.children;
            TweenMax.set(_list, {opacity:0})
            // this.animate();
        });
    }

    getSingleVisual(path){
        let els = [];
        
        if(path){
            
            els.push(<img onLoad={(e) => this.onImageLoadedHandler(e, this)} src={ window.pfinder.assetPath + this.props.pathPrefix + path } />);
            
            
            this.setState({
                activeVisual: [els]
            },()=>{
                let _list = this.innercontainer.children;
                TweenMax.set(_list, {opacity:0})
            });

        }
    }

    render() {
        return (
            <div className="screen-visual" ref={ (el)=>{ this.container = el} }>
                { this.state.bed }
                <div ref={ (el)=>{ this.innercontainer = el}} style={{ width: '100%' }}>
                    { this.state.activeVisual }
                </div>
                { this.state.isLoading ? <div id="loading"><div className="loader">Loading...</div></div> : ""}
            </div>
        );
    }
}

export default ScreenVisual;