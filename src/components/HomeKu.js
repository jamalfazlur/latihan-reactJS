import React, { Component }  from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import CarouselKu from './CarouselKu';

class HomeKu extends Component{
    state = { listProduk: [] }

    componentWillMount(){
        axios.get('http://localhost:1997/produk')
            .then((res) => {
                // console.log(res.data);
                this.setState({ listProduk: res.data })
            }).catch((err) => {
                console.log(err);
            })
    }

    renderListProduk = () => {
        var listJSXProduk = this.state.listProduk.map((item) => {
            return (
                <div>
                    <h2>{item.merk}</h2>
                    <p>{item.desc}</p>
                </div>
            )
        })
        return listJSXProduk;
    }

    render(){
        // console.log(this.state.listProduk);
        return (
            <center>
                <CarouselKu/>
                <h1>Home Ku {this.props.email} </h1>
                {this.renderListProduk()}
                <h2>{this.props.namaKu}</h2>
            </center>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        namaKu: state.namaDiReducers,
        email: state.auth.email        
    }
}
export default connect(mapStateToProps)(HomeKu);