import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import {KONEKSI} from '../support/config';

class HistoryDetail extends Component{
    state = { listProduk: [] }
    
    componentDidMount(){
        this.getProdukList();
    }

    getProdukList = () => {
        var params = queryString.parse(this.props.location.search)
        console.log(params.trxId)

        axios.get(`${KONEKSI}/history?idUser=${this.props.username}&id=${params.trxId}`)
            .then((res) => {
                console.log(res.data[0].trx);
                this.setState({ listProduk: res.data[0].trx })
            }).catch((err) => {
                console.log(err);
            })
    }

    renderListProduk = () => {
        var listJSXProduk = this.state.listProduk.map((item) => {
            
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.merk}</td>
                    <td>{<img src={item.img} width="100px" alt=""/> }</td>
                    <td>Rp. {item.harga.toLocaleString()}</td> 
                    <td>{item.jumlah}</td>
                    <td></td>
                </tr>
            )
            
        })
        return listJSXProduk;
    }

    render(){
        if(this.props.username !== ""){
            return(
                <div className="container-fluid">
                    <h1>History Belanja: {this.props.username}</h1>
    
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID Produk</th>
                                <th>Merk</th>
                                <th>Gambar</th>
                                <th>Harga</th>
                                <th>Jumlah</th>
                                <th></th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.renderListProduk()}
                        </tbody>
    
                    </table>
                </div>
            );
        }
        return <Redirect to="/login" />
    }
}

const mapStateToProps = (state) => {
    return { 
        username: state.auth.username
    };
}

export default connect(mapStateToProps)(HistoryDetail);