import React, { Component } from 'react';
import Screens from './Screens';
import { isMobile } from "react-device-detect";


class Splash extends Component {

    constructor(){
        super();

        this.animateIn = this.animateIn.bind(this);
        this.animateOut = this.animateOut.bind(this);
    }

    onClickHandler() {

        ga("send", {
            hitType: "event",
            eventCategory: "Interaction",
            eventAction: "Splash start",
            eventLabel: "Splash start"
        });

        this.animateOut();
        
    }

    componentDidMount(){
        TweenMax.set(this.bed, {scale:0});
        TweenMax.set(this.content, {autoAlpha:0});
    }

    animateIn(){
        TweenMax.set([this.content, this.heading, this.cta], {y:10, autoAlpha:0});
        TweenMax.to(this.bed, .4, {scale:1, force3D:true, ease:'Back.easeOut'});
        TweenMax.to(this.heading, .5, {y:0, force3D:true, autoAlpha:1, delay:.4, ease:'Power2.easeOut'});
        TweenMax.to(this.content, .5, {y:0, force3D:true, autoAlpha:1, delay:.6, ease:'Power2.easeOut'});
        TweenMax.to(this.cta, .5, {y:0, force3D:true, autoAlpha:1, delay:.8, ease:'Power2.easeOut'});
    }

    animateOut(){
        TweenMax.to(this.bed, .4, {scale:0, force3D:true, ease:'Back.easeIn'});
        TweenMax.to(this.cta, .5, {y:10, autoAlpha:0, force3D:true, delay:0, ease:'Power2.easeOut'});
        TweenMax.to(this.content, .5, {y:10, autoAlpha:0, force3D:true, delay:.15, ease:'Power2.easeOut'});
        TweenMax.to(this.heading, .5, {y:10, autoAlpha:0, force3D:true, delay:.25, ease:'Power2.easeOut', onComplete:()=>{
            this.props.onChangeScreen(Screens.SCREENER);
        }});
    }

    render() {

        const { data } = this.props;
        
        return (
            <div id="splash-screen">
                <div className="center-content">
                    <div className="half-content left" ref={ (el)=>{ this.bed = el } }>
                        <img key="splashI" 
                            src= { window.pfinder.assetPath + "images/splash/" + (isMobile ? data.mobile : data.mobile) }
                            onLoad={() => {
                                this.animateIn()
                            }}
                            />
                    </div>

                    <div className="half-content right">
                        <div className="inner-content">
                            <h1 ref={ (el)=>{ this.heading = el } }>{ data.heading }</h1>
                            <p ref={ (el)=>{ this.content = el } }>{ data.content }</p>
                            <div ref={ (el)=>{ this.cta = el } } className="cta" onClick={()=>{ this.onClickHandler() }}  >{ data.ctas[0].label }</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Splash;