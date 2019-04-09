import React, { Component } from 'react';

class DialogBox extends Component {

    constructor(props){
        super(props);
        this.getContent = this.getContent.bind(this);

        this.bubble = React.createRef();
        this.content = React.createRef();
        this.ctas = [];

    }

    getContent(){
        const { data } = this.props;
        let _els = [];

        if(this.props.marker){
            _els.push( <div ref={this.marker} key="marker" className="marker"><span>{ this.props.marker }</span></div> ) 
        }

        if(data.heading != ""){
            _els.push( <h1 ref={this.heading} key="h20" className="title" dangerouslySetInnerHTML={{ __html: data.heading }}></h1> ) 
        }

        if(data.content != ""){
            _els.push( <p ref={this.content} key="p0" className="content" dangerouslySetInnerHTML={{ __html: data.content }}></p> ) 
        }
        
        let index = 0;
        data.ctas.map((cta) => {
            index = index + 1;
            _els.push( <div key={ "cta" + index } className="cta" onClick={()=>{ this.props.onClickHandler(cta) }}  >{ cta.label }</div> )
        })

        return _els;         
    }

    render() {
        return (
            <div id="dialog-box-component">
                <div className="dialog-bubble" ref={(el) => { this.bubble = el }}>
                    <div className="dialog-inner-content" ref={(el) => { this.container = el }}>
                        { this.getContent() }
                    </div>
                </div>
            </div>
        );
    }
}

export default DialogBox;