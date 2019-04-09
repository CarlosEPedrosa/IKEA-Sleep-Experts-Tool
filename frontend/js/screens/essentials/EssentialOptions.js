import React, { Component } from 'react';
import Screens from '../Screens';

class EssentialOptions extends Component {
    constructor(props){
        super(props);

        this.state = {
            defaults:[
                {
                    type: Screens.COMFORT,
                    value: 0
                },
                {
                    type: Screens.LIGHT,
                    value: 0
                },
                {
                    type: Screens.NOISE,
                    value: 0
                },
                {
                    type: Screens.TEMPERATURE,
                    value: 0
                },
                {
                    type: Screens.AIR,
                    value: 0
                },
            ],
            priority: []
        }

        this.noiseBtn = React.createRef();
        this.lightBtn = React.createRef();
        this.airBtn = React.createRef();
        this.comfortBtn = React.createRef();
        this.temperatureBtn = React.createRef();

        this.onClickHandler = this.onClickHandler.bind(this);
        this.markByScreen = this.markByScreen.bind(this);
        this.getPriority = this.getPriority.bind(this);
    }

    componentDidMount(){
        const { options } = this.props;
        
        let _defaults = this.state.defaults;

        for (let i = 0; i < _defaults.length; i++) {
            const element = options[i+2];
            
            switch(element){
                case "A" :  _defaults[i].value = _defaults[i].value + 1
                            break;
                case "B" :  _defaults[i].value = _defaults[i].value + 2 
                            break;
                case "C" :  _defaults[i].value = _defaults[i].value + 3
                            break;
            }
            
        }

        _defaults.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
        
        this.setState({
            priority: _defaults.reverse()
        },()=>{
            TweenMax.staggerFrom(
                ".essential-bubble"
            , 0.5, {scale:0, ease:'Back.easeOut'}, 0.15);
        })
    }

    getPriority(id){

        let temp = this.state.priority;
        let _value = 0;

        for (let i = 0; i < temp.length; i++) {
            if(id === temp[i].type){
                 _value = i + 1;
                 break;
            }
        }

        return _value;
    }

    onClickHandler(event, screen){
        event.preventDefault();

        this.markByScreen(screen);
        this.props.onOptionsChange(screen, this.getPriority(screen));
    }

    markByScreen(screen){
        console.log(this.noiseBtn.current.className);
        console.dir(this.noiseBtn.current);
        
        
        this.noiseBtn.current.className = ( screen === Screens.NOISE?"essential-bubble noise activated":"essential-bubble noise" );
        this.lightBtn.current.className = ( screen === Screens.LIGHT?"essential-bubble light activated":"essential-bubble light" );
        this.comfortBtn.current.className = ( screen === Screens.COMFORT?"essential-bubble comfort activated":"essential-bubble comfort" );
        this.temperatureBtn.current.className = ( screen === Screens.TEMPERATURE?"essential-bubble temperature activated":"essential-bubble temperature" );
        this.airBtn.current.className = ( screen === Screens.AIR?"essential-bubble air activated":"essential-bubble air" );
    }

    render() {
        return (
            <div className="essential-options">

                <div className="essential-bubble temperature" ref={this.temperatureBtn} onClick={(event)=>{ this.onClickHandler(event, Screens.TEMPERATURE) }}>
                    <p>{ this.getPriority(Screens.TEMPERATURE) }</p>
                </div>

                <div className="essential-bubble noise" ref={this.noiseBtn} onClick={(event)=>{ this.onClickHandler(event, Screens.NOISE) }}>
                    <p>{ this.getPriority(Screens.NOISE) }</p>
                </div>

                <div className="essential-bubble light" ref={this.lightBtn} onClick={(event)=>{ this.onClickHandler(event, Screens.LIGHT) }}>
                    <p>{ this.getPriority(Screens.LIGHT) }</p>
                </div>

                <div className="essential-bubble comfort" ref={this.comfortBtn} onClick={(event)=>{ this.onClickHandler(event, Screens.COMFORT) }}>
                    <p>{ this.getPriority(Screens.COMFORT) }</p>
                </div>

                <div className="essential-bubble air" ref={this.airBtn} onClick={(event)=>{ this.onClickHandler(event, Screens.AIR) }}>
                    <p>{ this.getPriority(Screens.AIR) }</p>
                </div>
            </div>
        );
    }
}

export default EssentialOptions;