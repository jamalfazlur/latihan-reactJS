import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ProdukItems from './ProdukItems';

class ProdukList extends Component {
    
    state = { listProduk: [], searchListProduk: [] /*filterForm: ""*/ }

    componentDidMount(){
        axios.get('http://localhost:1997/produk')
            .then((res) => {
                // console.log(res.data);
                this.setState({ listProduk: res.data, searchListProduk: res.data })
            }).catch((err) => {
                console.log(err);
            })
    }

    onBtnSearchClick = () => {
        var namaProduk  = this.refs.searchProduk.value;
        var kategoriProduk = this.refs.searchKategori.value;
        var hargaMin = parseInt(this.refs.hargaMinSearch.value);
        var hargaMax = parseInt(this.refs.hargaMaxSearch.value);

        var arrSearch = this.state.listProduk.filter((item) => {
            return item.kategori.includes(kategoriProduk) 
            && item.harga >= hargaMin
            && item.harga <= hargaMax
            && item.merk.toLowerCase().includes(namaProduk.toLowerCase());
        })
        this.setState({searchListProduk: arrSearch})
    }

    renderListProduk = () => {
        var listJSXProduk = this.state.searchListProduk.map((item) => {
            return (
                <ProdukItems produk={item}/>
            );
        })
        return listJSXProduk;
    }


    render(){
        if(this.props.username !== ""){
            if(this.props.produk.id !== 0){
                // return <Redirect to={`/produkdetail/${this.props.produk.id}`} />
                return <Redirect to={`/produkdetail?produkid=${this.props.produk.id}&merk=${this.props.produk.merk}`} />
            }
            return (
                <div>
                    <section className="bg-light" id="portfolio">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h2 className="section-heading text-uppercase">Product List</h2>
                                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                                    
                                    <div class="col-sm-12 input-group input-group-lg searchproduk" style={{marginBottom: "30px"}}>
                                        
                                        <select ref="searchKategori" className="form-control">
                                            <option value="">ALL CATEGORIES</option>
                                            <option>tisu</option>
                                            <option>minyak</option>
                                            <option>obat</option>
                                        </select>

                                        <input type="text" className="form-control col-sm-8" ref="searchProduk" placeholder="Type a keyword.." aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                                        <input type="number" ref="hargaMinSearch" placeholder="from" defaultValue="0" className="form-control"/>
                                        <input type="number" ref="hargaMaxSearch" placeholder="to" defaultValue="9999999" className="form-control"/>
                                        <div className="input-group-append col-sm-1">
                                            
                                            <button className="btn btn-primary" onClick={() => {this.onBtnSearchClick()}}> <i class="fas fa-search"></i> </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            
                            <div className="row"> 
                                {this.renderListProduk()}
                                {/* {this.renderFilterProduk()} */}
                                
                            </div>
    
                        </div>
                    </section>
                </div>
            );
        }

        return <Redirect to="/login" />
    }
}

const mapStateToProps = (state) => {
    return { 
        username: state.auth.username,
        produk: state.selectedProduk
    };
}

export default connect(mapStateToProps)(ProdukList);



{ /* ======== FILTER JAMAL ======== */}
{/* <div class="col-sm-10 offset-sm-1 input-group input-group-lg searchproduk" style={{marginBottom: "30px"}}>
    
    <input type="text" class="form-control" ref="searchProduk" placeholder="Type a keyword.." onKeyUp={() => {this.formSearch()}} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
    <div class="input-group-append">
        <span className="input-group-text"><i class="fas fa-search"></i></span>
    </div>
</div> */}
{ /* ======== FILTER JAMAL (end) ======== */}

    // ============================ Filter =========================================
    // formSearch = () => {
    //     var filterSomething = this.refs.searchProduk.value;
    //     this.setState({filterForm: filterSomething})
    // }
    // filterProduk = () => {
    //     var listProdukFilter = this.state.listProduk.filter((item) => {
    //         return ( 
    //             item.merk.toLowerCase().includes(this.state.filterForm.toLowerCase())
    //         );
    //     })
    //     return listProdukFilter
    // }

    // renderFilterProduk = () => {   // INI PENGGANTI ---> renderListProduk()
    //     var total = 12, size = 4, check = true;
        
    //     var resultFilter = this.filterProduk().map((item) =>{
    //         // =========== ZEBRA EFFECT =============//
    //         if(total === 0 && check === true){
    //             size = 6;
    //             total = 12;
    //             check = false;
    //         } else if(total === 0 && check === false) {
    //             size = 4;
    //             total = 12;
    //             check = true;
    //         }
    //         total -= size;
    //         // =========== ZEBRA EFFECT =============//

    //         return (
    //             <ProdukItems size={size} produk={item}/>
    //         );
    //     })
    //     return resultFilter;
    // }
    // ============================ Filter =========================================