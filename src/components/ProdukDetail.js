import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import queryString from 'query-string';
import { select_produk } from '../actions';
import {KONEKSI} from '../support/config';

class ProdukDetail extends Component{
    componentDidMount(){
        // var produkId = this.props.match.params.id;
        // console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var produkId = params.produkid;
    
        axios.get(`${KONEKSI}/produk/${produkId}`)
            .then((res) => {
                // console.log(res)
                this.props.select_produk(res.data)
            }).catch((err) => {
                // console.log(err)
            })
    }
    onAddToCart = () =>{
        var username = this.props.username;
        var produkId = this.props.produk.id;
        var merk = this.props.produk.merk;
        var kategori = this.props.produk.kategori;
        var img = this.props.produk.img;
        var jumlah = parseInt(this.refs.tbJumlah.value); 
        var harga = this.props.produk.harga;

        console.log(username,produkId,harga,jumlah,merk,kategori,img);

        axios.post(`${KONEKSI}/keranjang`, {
            idUser: username,
            idProduk: produkId,
            jumlah: jumlah,
            harga: harga,
            totHarga: (harga*jumlah),
            merk: merk,
            kategori: kategori,
            img: img,
            isFinished : false

        }).then((res) =>{
            alert(`${this.props.produk.merk} berhasil ditambah ke cart sejumlah: ${jumlah}`)
        }).catch((err)=>{
            alert(err);
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
                            <p>Description: {desc}</p>
                        </div>
                        <hr />
                        <div className="row">
                            <input type="number" className="form-control col-sm-2" placeholder="Jumlah" ref="tbJumlah" />
                        </div>
                        <div className="row">
                            <button className="btn btn-success" onClick={this.onAddToCart}><i class="fas fa-shopping-cart"></i> Add</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {    produk: state.selectedProduk,
                username: state.auth.username }
}

export default connect(mapStateToProps, { select_produk })(ProdukDetail);