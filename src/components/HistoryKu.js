import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { select_history } from '../actions';
import {KONEKSI} from '../support/config';

class HistoryKu extends Component{
    state = { listProduk: [], selectedRow : 0}
    
    componentDidMount(){
        this.getProdukList();    
    }

    getProdukList = () => {
        axios.get(`${KONEKSI}/history?idUser=${this.props.username}`)
            .then((res) => {
                console.log(res.data);
                this.setState({ listProduk: res.data, selectedRow: 0 })
            }).catch((err) => {
                console.log(err);
            })
    }

    renderListProduk = () => {
        var listJSXProduk = this.state.listProduk.map((item) => {
            if(this.state.selectedRow !== 0){
                return <Redirect to={`/historydetail?trxId=${this.state.selectedRow}`} />    
            }
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.idUser}</td>
                    <td>{item.tgl}</td>
                    <td>{item.trx.length}</td>
                    <td>{item.totalBelanja}</td>
                    <td> <input type="button" className="btn btn-warning" value="Details" onClick={() => this.setState({selectedRow: item.id})}   /></td>
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
                                <th>ID Trx</th>
                                <th>Username</th>
                                <th>Tanggal Transaksi</th>
                                <th>Total Item</th>
                                <th>Total Price</th>
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
        username: state.auth.username,
        history: state.selectedHistory
    };
}

export default connect(mapStateToProps, {select_history})(HistoryKu);