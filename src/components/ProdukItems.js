import React, { Component } from 'react';
import { connect } from 'react-redux'
import { select_produk } from '../actions'

class ProdukItems extends Component {

    onItemClick = () => {
        this.props.select_produk(this.props.produk);
    }
    
    render(){
        
        var {merk, img, desc, harga} = this.props.produk;
        var merkNew = merk.toUpperCase();
        var hargaNew = harga.toLocaleString();
        return(
            <div onClick={this.onItemClick} style={{background:"#ddd"}} className={`col-md-${this.props.size} col-sm-4 portfolio-item`}>
                <a className="portfolio-link" data-toggle="modal">
                    <div className="portfolio-hover">
                        <div className="portfolio-hover-content">
                            <i className="fas fa-plus fa-3x" />
                        </div>
                    </div>
                    <img className="img-fluid" src={img} alt="" />
                </a>
                <div className="portfolio-caption">
                    <h4>{merkNew}</h4>
                    <h5>Rp. {hargaNew}</h5>
                    <p className="text-muted">{desc}</p>
                </div>
            </div>
        );
    }
}

export default connect(null, { select_produk })(ProdukItems);