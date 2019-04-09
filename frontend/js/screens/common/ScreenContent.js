import React, { Component } from 'react';

import DialogBox from "../../components/DialogBox";
import Intro from '../../components/Intro';
import Product from '../../components/Product';
import { isMobile } from "react-device-detect";

class ScreenContent extends Component {

    constructor(props){
        super(props);

        this.state = {
            content: <React.Fragment></React.Fragment>
        }

        this.getScreenLayout = this.getScreenLayout.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    componentDidMount(){
        this.getScreenLayout();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.currentpage !== this.props.currentpage){
            this.getScreenLayout();
        }
    }

    getScreenLayout(){
        const { screens, currentpage } = this.props;
        if(screens[currentpage]){
            let type = String(screens[currentpage].type).toLowerCase();
            
            let _content;
            switch(type){
                
                case "question":    _content =  <DialogBox data={ screens[currentpage] } onClickHandler={ this.onClickHandler } marker={ false }/>
                                    break;                                
                
                case "marker":      _content = <DialogBox data={ screens[currentpage] } onClickHandler={ this.onClickHandler } marker={ this.props.priority }/>;
                                    break;

                case "intro":       _content =  <Intro heading={ screens[currentpage].heading } content={ screens[currentpage].content }/>;
                                    break;

                case "product":     _content =  <Product data={ screens[currentpage] } onClickHandler={ this.onClickHandler }/>;
                                    break;
                                    
            }

            this.setState({
                content: _content
            },()=>{
                if(isMobile){
                    TweenMax.fromTo(this.container, .5, {y:20, autoAlpha:0}, {y:0, autoAlpha:1, force3D:true, ease:'Power2.easeOut'})
                }else{
                    TweenMax.fromTo(this.container, .5, {x:20, autoAlpha:0}, {x:0, autoAlpha:1, force3D:true, ease:'Power2.easeOut'})
                }
                
            })
        }
    }

    onClickHandler(ctaData) {

        if(isMobile){
            TweenMax.fromTo(this.container, .5, {y:0, autoAlpha:1}, {y:20, autoAlpha:0, force3D:true, ease:'Power2.easeIn', onComplete:()=>{
                this.setState({
                    content: <React.Fragment></React.Fragment>
                },()=>{
                    this.props.onPageChange(ctaData);
                });
            }})
        }else{
            TweenMax.fromTo(this.container, .5, {x:0, autoAlpha:1}, {x:20, autoAlpha:0, force3D:true, ease:'Power2.easeIn', onComplete:()=>{
                this.setState({
                    content: <React.Fragment></React.Fragment>
                },()=>{
                    this.props.onPageChange(ctaData);
                });
            }})
        }
        
        
    }

    render() {
        return (
            <div className='screen-content' ref={(el) => { this.container = el; }}>
                { this.state.content }
            </div>
        )
    }
}

export default ScreenContent;