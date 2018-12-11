import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class HistoryDetail extends Component{
    state = { listProduk: [], selectedRow : 0}
    
    componentDidMount(){
        this.getProdukList();    
    }

    getProdukList = () => {
        axios.get(`http://localhost:1997/history?idUser=${this.props.username}&id=`)
            .then((res) => {
                console.log(res.data);
                this.setState({ listProduk: res.data, selectedRow: 0 })
            }).catch((err) => {
                console.log(err);
            })
    }

    renderListProduk = () => {
        var listJSXProduk = this.state.listProduk.map((item) => {
            if(item.id !== this.state.selectedRow){
                return (
                    <tr>
                        <td>
                            {item.id}
                        </td>
                        <td>
                            {item.idUser}
                        </td>
                        <td>
                            {item.tgl}
                        </td>
                        <td>
                            {item.trx.length}
                        </td>
                        <td>
                            {item.totalBelanja}
                        </td>
                        
                        <td>
                            <input type="button" className="btn btn-warning" value="Details" onClick={<Redirect to={`/historydetail?id=${item.id}`} />}   />
                        </td>
                        
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>
                        <input type="text" defaultValue={item.merk} ref="merkEdit"/>
                    </td>
                    <td>
                        <input type="text" defaultValue={item.kategori} ref="kategoriEdit"/>
                    </td> 
                    <td>
                        <input type="text" defaultValue={item.harga} ref="hargaEdit"/>
                    </td>
                    <td>
                        <input type="text" defaultValue={item.img} ref="imgEdit"/>
                    </td>
                    <td>
                        <textarea defaultValue={item.desc} ref="descEdit" rows="1" ></textarea>
                    </td>
                    <td>
                        <input type="button" className="btn btn-primary" value="Save"  onClick={() => this.onBtnSaveClick(item.id)} />
                    </td>
                    <td>
                        <input type="button" className="btn btn-default" value="Cancel" onClick={() => this.setState({selectedRow: 0})} />
                    </td>
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
        username: state.auth.username
    };
}

export default connect(mapStateToProps)(HistoryDetail);