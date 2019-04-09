import React, { Component } from 'react'

class ScreenerVisual extends Component {

    constructor(props){
        super(props);

        this.state = {
            visuals: this.props.visuals,
            activeVisuals: []
        }

        this.manageActiveVisuals = this.manageActiveVisuals.bind(this);
        this.animate = this.animate.bind(this);
        this.totalQuestions = 0;
    }

    componentDidMount(){
        const { screens } = this.props;
        let _totalQuestions = 0;
        screens.forEach(element => {
            if(element.type === "Question")_totalQuestions++;
        });

        this.totalQuestions = _totalQuestions;        

        this.manageActiveVisuals();
    }

    componentDidUpdate(prevProps){

        if(prevProps.currentpage !== this.props.currentpage && this.props.currentpage < (this.totalQuestions + 1)){
            
            if(this.props.currentpage < prevProps.currentpage){
                let newActiveVisuals = this.state.activeVisuals;
                
                if(newActiveVisuals.length > 1){
                    newActiveVisuals.pop();
                }

                if(this.props.currentpage === 0){                    
                    newActiveVisuals = [this.props.visuals[0].svg];
                }
                
                this.setState({
                    activeVisuals: newActiveVisuals
                })
            }else{
                this.manageActiveVisuals();
            }
        }
    }

    manageActiveVisuals(){
        const { currentpage, currentvalue } = this.props;
        let _visuals = this.state.visuals;
        let _av = this.state.activeVisuals;

        let _visual;
        let bed = null;
        _visuals.forEach(element => {
            if(element.screen === currentpage && element.variant === currentvalue){
                
                if(element.screen === 1 && element.variant === "C" || element.screen === 1 && element.variant === "B"){
                    // if its "child" then remove existing double bed
                    bed = _av.shift();  
                }                
                _visual = element.svg;
            }
        });
        
        _av.splice(currentpage, 0, _visual); 

        if(bed){            
            TweenMax.to(this.container, .25, {opacity:0, y:15, onComplete:()=>{
                this.setState({
                    activeVisuals: _av
                }, this.animateSpecific)    
            }})
        }else{
            this.setState({
                activeVisuals: _av
            }, this.animate)
        }
    }

    animateSpecific(){
        TweenMax.fromTo(this.container, .25, {opacity:0 , y:-15}, {opacity:1 , y:0, delay:.25, onComplete:()=>{
            let el = this.container;
            if(this.container.children[this.container.children.length-1]){
                el = this.container.children[this.container.children.length-1];
            }
        }});
    }

    animate(){
        TweenMax.to(this.container, .25, {opacity:1 , y:0, delay:.25, onComplete:()=>{
            let el = this.container;
            if(this.container.children[this.container.children.length-1]){
                el = this.container.children[this.container.children.length-1];
            }
        }});
    }

    render() {
        return (
            <div className="screener-visual" ref={ (el) => this.container = el }>
                {
                    this.state.activeVisuals
                }
            </div>
        );
    }
}

export default ScreenerVisual;