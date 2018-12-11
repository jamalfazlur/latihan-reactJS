import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class KeranjangKu extends Component{
    state = { listProduk: [], selectedRow : 0 }
    
    componentDidMount(){
        this.getProdukList();    
    }
    componentDidUpdate(){
        this.getProdukList();    
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure?')){
            axios.delete('http://localhost:1997/keranjang/' + id)
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

        axios.put('http://localhost:1997/keranjang/' + item.id, { 
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
        axios.get(`http://localhost:1997/keranjang?idUser=${this.props.username}&isFinished=false`)
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
                        <td>
                            {index+1}
                        </td>
                        <td>
                            {item.merk}
                        </td>
                        <td>
                            {<img src={item.img} width="100px" alt=""/> }
                        </td>
                        <td>
                            Rp. {item.harga.toLocaleString()}
                        </td>
                        <td>
                            {item.jumlah}
                        </td>
                        <td>
                            Rp. {item.totHarga.toLocaleString()}
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
                    <td>{index+1}</td>
                    <td>
                        {item.merk} 
                    </td>
                    <td>
                        {<img src={item.img} width="100px" alt=""/> }
                    </td> 
                    <td>
                        {item.harga} 
                    </td>
                    <td>
                        <input type="number" defaultValue={item.jumlah} ref="jumlahEdit"/>
                    </td>
                    <td>
                        {item.totHarga}
                    </td>
                    <td>
                        <input type="button" className="btn btn-primary" value="Save"  onClick={() => this.onBtnSaveClick(item)} />
                    </td>
                    <td>
                        <input type="button" className="btn btn-default" value="Cancel" onClick={() => this.setState({selectedRow: 0})} />
                    </td>
                </tr>
            )
            
        })
        return listJSXProduk;
    }

    onCheckOutButton = () => {
        var date = new Date();

        if(window.confirm('Anda yakin ingin checkout?')){
            axios.get(`http://localhost:1997/keranjang?idUser=${this.props.username}&isFinished=false`)
                .then((res) => {
                
                    for(var i =0; i < res.data.length; i++){
                        // console.log(res.data[i].id);
                        axios.put('http://localhost:1997/keranjang/' + res.data[i].id, {
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
                axios.post('http://localhost:1997/history', { 
                    idUser: this.props.username,
                    tgl: `${date.getDate()}-${date.getUTCMonth()}-${date.getFullYear()}`,
                    totalBelanja: this.getTotalBelanja(),
                    trx : res.data
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
                        <button type="button" className="btn btn-success" onClick={() => {this.onCheckOutButton()}}>Checkout</button>
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