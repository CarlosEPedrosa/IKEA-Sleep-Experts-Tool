import React, { Component } from 'react';
import Screens from './Screens';

import Splash from './Splash';
import Screener from './screener/Screener';
import Essentials from './essentials/Essentials';

import Screen from './common/Screen';

class ScreenManager extends Component {

    constructor(props){
        super(props);

        this.state = {
            activeScreen: Screens.SPLASH,
            extra:{
                params: {}
            },
            screenerOptions: {},
            screenerFirst:false
        }

        this.showScreen = this.showScreen.bind(this);
        this.changeScreen = this.changeScreen.bind(this);
    }

    showScreen(){

        ga('send', 'screenview', {screenName: this.state.activeScreen});

        let _screen;

        switch(this.state.activeScreen){

            case Screens.SPLASH :   _screen = <Splash 
                                                    data={this.props.data.screens[0]}
                                                    onChangeScreen={ (screenID, params) => { this.changeScreen(screenID, params) } } 
                                                />
                                    break;
            
            case Screens.SCREENER :  _screen = <Screener 
                                                    screens={this.props.data.screener.screens}
                                                    visuals={ this.props.data.screener.visuals }
                                                    onChangeScreen={ (screenID, params) => { this.changeScreen(screenID, params) } }
                                                />
                                    break;
            
            case Screens.ESSENTIALS :  _screen = <Essentials 
                                                    screens={this.props.data.screens[1].essentials}
                                                    options={ this.state.screenerOptions.options }
                                                    visuals={ this.state.screenerOptions.visuals }
                                                    isFirst={ this.state.screenerFirst }
                                                    onChangeScreen={ (screenID, params) => { this.changeScreen(screenID, params) } }
                                                />
                                        break;
            
            case Screens.COMFORT :      _screen = <Screen 
                                                    name={'Comfort'}
                                                    pathPrefix={'images/comfort/'}
                                                    screens={this.props.data.comfort}
                                                    onChangeScreen={ (screenID, params) => { this.changeScreen(screenID, params) } }
                                                />
                                        break;

            case Screens.LIGHT :      _screen = <Screen 
                                                    name={'Light'}
                                                    pathPrefix={'images/light/'}
                                                    screens={this.props.data.light}
                                                    onChangeScreen={ (screenID, params) => { this.changeScreen(screenID, params) } }
                                                />
                                        break;

            case Screens.NOISE :      _screen = <Screen 
                                                    name={'Noise'}
                                                    pathPrefix={'images/noise/'}
                                                    screens={this.props.data.noise}
                                                    onChangeScreen={ (screenID, params) => { this.changeScreen(screenID, params) } }
                                                />
                                        break;

            case Screens.TEMPERATURE :  _screen = <Screen 
                                                    name={'Temperature'}
                                                    pathPrefix={'images/temperature/'}
                                                    screens={this.props.data.temperature}
                                                    onChangeScreen={ (screenID, params) => { this.changeScreen(screenID, params) } }
                                                />
                                        break;

            case Screens.AIR :          _screen = <Screen 
                                                    name={'Air Quality'}
                                                    pathPrefix={'images/air/'}
                                                    screens={this.props.data.air}
                                                    onChangeScreen={ (screenID, params) => { this.changeScreen(screenID, params) } }
                                                />
                                        break;
        }

        return _screen;

    }

    changeScreen(screenID, _params){
        if(!_params) _params = {};

        if(_params.options && _params.visuals){

            // Coming from Screener, apply Options ONCE!
            this.setState({
                extra:{
                    params: _params
                },
                activeScreen: screenID,
                screenerOptions: _params,
                screenerFirst: true
            })
        }else{

            // Everywhere else
            this.setState({
                extra:{
                    params: _params
                },
                activeScreen: screenID,
                screenerFirst: false
            })
        }
    }

    render() {
        return (
                <div className="screen-manager">
                    {this.showScreen()}
                </div>
        );
    }
}

export default ScreenManager;