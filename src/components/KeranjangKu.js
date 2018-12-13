import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {KONEKSI} from '../support/config';

class KeranjangKu extends Component{
    state = { listProduk: [], selectedRow : 0 }
    
    componentDidMount(){
        this.getProdukList();    
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure?')){
            axios.delete(`${KONEKSI}/keranjang/${id}`)
            .then((res) => {
                this.getProdukList();
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    onBtnSaveClick = (item) => {
        var tbJumlah = parseInt(this.refs.jumlahEdit.value);
        console.log(tbJumlah,item.harga,(tbJumlah*item.harga));

        axios.put(`${KONEKSI}/keranjang/${item.id}`, { 
            idUser: item.idUser, 
            idProduk: item.idProduk, 
            merk: item.merk, 
            kategori: item.kategori, 
            img: item.img, 
            isFinished: item.isFinished, 
            jumlah: tbJumlah, 
            harga: item.harga, 
            totHarga : (tbJumlah*item.harga)
        }).then((res) => {
            this.getProdukList();
        }).catch((err) => {
            console.log(err)
        })
        
    }

    getProdukList = () => {
        axios.get(`${KONEKSI}/keranjang?idUser=${this.props.username}&isFinished=false`)
            .then((res) => {
                console.log(res.data);
                this.setState({ listProduk: res.data, selectedRow: 0 })
            }).catch((err) => {
                console.log(err);
            })
    }

    getTotalBelanja = () => {
        var totalBelanja = 0;
        for(var i =0; i < this.state.listProduk.length; i++){
            totalBelanja += this.state.listProduk[i].totHarga;
        }
        return totalBelanja;
    }

    renderListProduk = () => {
        
        var listJSXProduk = this.state.listProduk.map((item, index) => {
          
            if(item.id !== this.state.selectedRow){
                return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{item.merk}</td>
                        <td>{<img src={item.img} width="100px" alt=""/> }</td>
                        <td>Rp. {item.harga.toLocaleString()}</td>
                        <td>{item.jumlah}</td>
                        <td> Rp. {item.totHarga.toLocaleString()}</td>
                        <td><button type="button" className="btn btn-warning" onClick={() => this.setState({selectedRow: item.id})}   ><i class="fas fa-edit"></i> Edit</button></td>
                        <td><button type="button" className="btn btn-danger" onClick={() => this.onBtnDeleteClick(item.id)} ><i class="fas fa-trash-alt"></i> Delete</button></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{item.merk} </td>
                    <td>{<img src={item.img} width="100px" alt=""/> }</td> 
                    <td>{item.harga} </td>
                    <td><input type="number" defaultValue={item.jumlah} ref="jumlahEdit"/></td>
                    <td>{item.totHarga}</td>
                    <td><input type="button" className="btn btn-primary" value="Save"  onClick={() => this.onBtnSaveClick(item)} /></td>
                    <td><input type="button" className="btn btn-default" value="Cancel" onClick={() => this.setState({selectedRow: 0})} /></td>
                </tr>
            )
        })
        return listJSXProduk;
    }

    onCheckOutButton = () => {
        var date = new Date();

        if(window.confirm('Anda yakin ingin checkout?')){
            axios.get(`${KONEKSI}/keranjang?idUser=${this.props.username}&isFinished=false`)
                .then((res) => {
                
                    for(var i =0; i < res.data.length; i++){
                        // console.log(res.data[i].id);
                        axios.put(`${KONEKSI}/keranjang/${res.data[i].id}`, {
                            idUser: res.data[i].idUser, 
                            idProduk: res.data[i].idProduk,
                            merk: res.data[i].merk,
                            kategori: res.data[i].kategori,
                            img: res.data[i].img,
                            jumlah: res.data[i].jumlah,
                            harga: res.data[i].harga,
                            totHarga: res.data[i].totHarga,
                            isFinished: true
                        }) 
                    }
                // console.log(res.data);
                axios.post(`${KONEKSI}/history`, { 
                    idUser: this.props.username,
                    tgl: `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
                    totalBelanja: this.getTotalBelanja(),
                    trx : res.data
                }).then((result)=>{
                    this.getProdukList();
                })
                
            }).catch((err) => {
                console.log(err);
            })

            this.getProdukList();
        }
        return <Redirect to="/history" />
    }

    render(){
        if(this.props.username !== ""){
            return(
                <div className="container-fluid">
                    <h1>Cart Belanjamu, {this.props.username}</h1>
    
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Merk</th>
                                <th>Gambar</th>
                                <th>Harga</th>
                                <th>Jumlah</th>
                                <th>Total Harga</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.renderListProduk()}
                        </tbody>
                        

                    </table>

                    <div className="alert alert-success text-center" role="alert" >
                        <h3 style={{marginBottom:"0"}}>Total Belanja: Rp. {this.getTotalBelanja().toLocaleString()}</h3><hr/>
                        <button type="button" className="btn btn-success" onClick={() => {this.onCheckOutButton()}}><i class="fas fa-sign-out-alt"></i> Checkout</button>
                    </div>
                    <div></div>
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

export default connect(mapStateToProps)(KeranjangKu);