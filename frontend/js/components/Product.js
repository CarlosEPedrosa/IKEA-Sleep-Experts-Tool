import React, { Component } from 'react';

class Product extends Component {

    constructor(props){
        super(props);

        this.state = {
            content: [],
            products: [],
            ctas:[]
        }

        this.getContent = this.getContent.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.getCTAs = this.getCTAs.bind(this);

        this.shuffle = this.shuffle.bind(this);
        this.onCtaClickHandler = this.onCtaClickHandler.bind(this);
        this.onProductClickHandler = this.onProductClickHandler.bind(this);
    }

    componentDidMount(){        
        this.setState({
            content: this.getContent(),
            products: this.getProducts(),
            ctas: this.getCTAs()
        },()=>{
            
            TweenMax.set([this.bubble, this.pin], {y:-300});
            TweenMax.to(this.bubble, .25, {y:0, ease:'Power2.easeOut', delay:.25});            

            let _list = this.productList.children;
            TweenMax.to(this.pin, .25, {y:0, ease:'Power2.easeOut', delay:.25, onComplete:()=>{
                for (let i = 0; i < _list.length; i++) {
                    TweenMax.to(_list[i], .25,{y: 0, opacity: 1, ease:'Power2.easeOut', delay:i*.1});  
                }

                TweenMax.to(this.ctas, .25,{y: 0, opacity: 1, ease:'Power2.easeOut'});  
            }});
        });
    }

    componentDidUpdate(prevState){        
        if(prevState.content != this.state.content){
            TweenMax.to(this.bubble, .25, {y:0, ease:'Power2.easeOut', delay:.25});            

            let _list = this.productList.children;
            TweenMax.to(this.pin, .25, {y:0, ease:'Power2.easeOut', delay:.25, onComplete:()=>{
                for (let i = 0; i < _list.length; i++) {
                    TweenMax.to(_list[i], .25,{y: 0, opacity: 1, ease:'Power2.easeOut', delay:i*.1});  
                }

                TweenMax.to(this.ctas, .25,{y: 0, opacity: 1, ease:'Power2.easeOut'});  
            }});
        }
    }

    onProductClickHandler(url){
        window.open(url,'_blank')
    }

    getContent(){
        const { data } = this.props;

        let _dom = [];
        let _index = Math.random() * 4; 
        _dom.push(
            <p key={"cont"+_index} className="content">{ data.content }</p>
        )

        if(data.extra !== ""){
            _dom.push(
                <p key={"ext"+_index} className="extra">{ data.extra }</p>
            )
        }

        return _dom;
    }

    getProducts(){
        const { data } = this.props;

        let _dom = [];
        let _index = 0;

        data.products.forEach(product => {            
            _index++;

            let _destination = product.destination[window.pfinder.localeSimple];
            let _price = product.price[window.pfinder.localeSimple];

            _dom.push(
                <div key={"sp"+_index} className="single-product" onClick={() =>{ this.onProductClickHandler(_destination) }}>
                    <div className="image-holder">
                        <img key={"i"+_index} className="image" src= { window.pfinder.assetPath + product.visual } />
                    </div>
                    <div className="content-holder">
                        <p key={"desc"+_index} className="description">{ product.description }</p>
                        <p key={"name"+_index} className="name">{ product.name }</p>
                        <p key={"pri"+_index} className="price">{ _price }</p>
                    </div>
                </div>
            )
        });

        _dom = this.shuffle(_dom);

        data.articles.forEach(article => {            
            _index++;

            let _destination = article.destination[window.pfinder.localeSimple] === "" ? article.destination["gben"] : article.destination[window.pfinder.localeSimple];

            _dom.unshift(
                <div key={"sp"+_index} className="single-article" onClick={() =>{ this.onProductClickHandler(_destination) }}>
                    <div className="image-holder">
                        <img key={"i"+_index} className="image" src= { window.pfinder.assetPath + article.visual } />
                    </div>
                    <div className="content-holder">
                        <p key={"name"+_index} className="name">{ article.name }</p>
                        <p key={"desc"+_index} className="description">{ article.description }</p>
                    </div>
                    <span>Read article</span>
                </div>
            )
        });

        return _dom;
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    getCTAs(){
        const { data } = this.props;

        let _dom = [];
        let _index = 0;
        data.ctas.forEach(cta => {
            _dom.push(
                <div key={ "cta" + _index++ } className="cta" onClick={()=>{ this.onCtaClickHandler(cta) }}  >{ cta.label }</div>
            );
        });

        return _dom;
    }

    onCtaClickHandler(ctaData){

        TweenMax.to(this.pin, .25, {opacity:0, ease:'Power2.easeOut'});
        TweenMax.to(this.bubble, .25, {opacity:0, ease:'Power2.easeOut', onComplete:()=>{ 
            this.props.onClickHandler(ctaData);
        }});
        
        let _list = this.productList.children;
        for (let i = 0; i < _list.length; i++) {
            TweenMax.to(_list[i], .15,{opacity: 0});  
        }
         
        TweenMax.to(this.ctas, .25,{opacity: 0});  
        
    }

    render() {
        return (
            <div className="product-component">
                <div className="dialog-bubble" ref={(el)=>{ this.bubble = el}}>
                    <div className="dialog-inner-content">
                        { this.state.content }
                    </div>
                </div>
                <div className="dialog-pin" ref={(el)=>{ this.pin = el}}></div>

                <div className="product-list">
                    <div className="inner-product-list" ref={(el)=>{ this.productList = el}}>
                        { this.state.products }
                    </div>
                </div>
                <div className="cta-holder" ref={(el)=>{ this.ctas = el}}>
                        { this.state.ctas }
                </div>
            </div>
        );
    }
}

export default Product;