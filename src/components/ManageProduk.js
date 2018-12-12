import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {KONEKSI} from '../support/config';

class ManageProduk extends Component{
    state = { listProduk: [], selectedRow : 0}
    
    componentDidMount(){
        this.getProdukList();    
    }

    onBtnAddClick = () => {
        var merk = this.refs.merkAdd.value;
        var kategori = this.refs.kategoriAdd.value;
        var desc = this.refs.descAdd.value;
        var harga = parseInt(this.refs.hargaAdd.value);
        var img = this.refs.imgAdd.value;

        axios.post(`${KONEKSI}/produk`, {
            merk, kategori, desc, harga, img
        }).then((res) => {
            this.getProdukList();
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure?')){
            axios.delete(`${KONEKSI}/produk/${id}` )
            .then((res) => {
                this.getProdukList();
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    onBtnSaveClick = (id) => {
        var merk = this.refs.merkEdit.value;
        var kategori = this.refs.kategoriEdit.value;
        var desc = this.refs.descEdit.value;
        var harga = parseInt(this.refs.hargaEdit.value);
        var img = this.refs.imgEdit.value;

        axios.put(`${KONEKSI}/produk/${id}`, { 
            merk, kategori, desc, harga, img
        }).then((res) => {
            this.getProdukList();
        }).catch((err) => {
            console.log(err)
        })
        
    }

    getProdukList = () => {
        axios.get(`${KONEKSI}/produk`)
            .then((res) => {
                // console.log(res.data);
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
                            {item.merk}
                        </td>
                        <td>
                            {item.kategori}
                        </td>
                        <td>
                            {item.harga}
                        </td>
                        <td>
                            {<img src={item.img} width="100px" alt=""/> }
                        </td>
                        <td>
                            {item.desc}
                        </td>
                        <td>
                            <input type="button" className="btn btn-warning" value="Edit" onClick={() => this.setState({selectedRow: item.id})}   />
                        </td>
                        <td>
                            <input type="button" className="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} />
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
                    <h1>Manage Products</h1>
    
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Merk</th>
                                <th>Kategori</th>
                                <th>Harga</th>
                                <th>Gambar</th>
                                <th>Description</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.renderListProduk()}
                        </tbody>
    
                        <tfoot>
                            <tr>
                                <td></td>
                                <td><input ref="merkAdd" type="text" placeholder="Nama Produk" /></td>
                                <td>
                                    <select ref="kategoriAdd">
                                        <option>Tisu</option>
                                        <option>Obat</option>
                                        <option>Minyak</option>
                                    </select>
                                </td>
                                <td><input ref="hargaAdd" type="number" placeholder="Harga Produk" /></td>
                                <td><input ref="imgAdd" type="text" placeholder="Image Produk" /></td>
                                <td><textarea ref="descAdd" placeholder="Type a description" rows="1"/></td>
                                <td colSpan="2"><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                                
                            </tr>
                            
                        </tfoot>
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

export default connect(mapStateToProps)(ManageProduk);