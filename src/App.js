import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

import { keepLogin, cookieChecked } from './actions'
import HeaderKu from './components/HeaderKu';
import LoginKu from './components/LoginKu';
import HomeKu from './components/HomeKu';
import RegisterKu from './components/RegisterKu';
import ProdukList from './components/ProdukList';
import ManageProduk from './components/ManageProduk';
import ProdukDetail from './components/ProdukDetail';

const cookies = new Cookies();

class App extends Component {

  state = {content: 'Ini sebelum diubah'};

  // onBtnOkClick = () =>{
  //   this.setState({content: 'Sudah Berubah'})
  // }

  // componentWillReceiveProps(newProps) {
  //     console.log('WillReceiveProps() has been TRIGGERED ...')
  //     if(newProps.username !== '') {
  //         cookies.set('myPengguna', newProps.username, {path: '/'})
  //     }
  // }

  componentDidMount() {
      const username = cookies.get('myPengguna');
      if(username !== undefined){
          this.props.keepLogin(username);
      } else {
        this.props.cookieChecked();
      }
  }
  
  render() {
    // var {content, username } = this.state;
    if(this.props.cookie){

      return (
        <div>
          
          <HeaderKu navBrand={'JamalKu'} />
          <div>
            <Route exact path="/" component={HomeKu} />
            <Route path="/login" component={LoginKu} />
            <Route path="/register" component={RegisterKu} />
            <Route path="/produk" component={ProdukList} />
            <Route path="/manageproduk" component={ManageProduk} />
            <Route path="/produkdetail/" component={ProdukDetail} />
          </div>
          
    
        </div>
      );
    }

    return (  <div>
                <h1 className="text-center" style={{marginTop: '100px'}}> <i className="fas fa-spinner"></i> </h1>
              </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cookie: state.auth.cookie }
}
export default withRouter(connect(mapStateToProps, {keepLogin, cookieChecked})(App));
