import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import queryString from 'query-string';
import { select_produk } from '../actions'

class ProdukDetail extends Component{
    componentDidMount(){
        // var produkId = this.props.match.params.id;
        // console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var produkId = params.produkid;
    
        axios.get(`http://localhost:1997/produk/${produkId}`)
            .then((res) => {
                // console.log(res)
                this.props.select_produk(res.data)
            }).catch((err) => {
                // console.log(err)
            })
    }
    render(){
        var { merk, harga, desc, img } = this.props.produk;
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4"> 
                        <img src={img} alt={img} className="img-responsive"/>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <h2>{merk}</h2>
                        </div>
                        <div className="row">
                            <h3>Rp.{harga.toLocaleString()}</h3>
                        </div>
                        <div className="row">
                            <p>{desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { produk: state.selectedProduk }
}

export default connect(mapStateToProps, { select_produk })(ProdukDetail);