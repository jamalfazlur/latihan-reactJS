import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { onUserRegister } from '../actions'

const cookies = new Cookies();

class RegisterKu extends Component{

    componentWillReceiveProps(newProps){
        if(newProps.username !== ''){
            cookies.set('myPengguna', newProps.username, {path: '/'})
        }
    }

    renderError = () => {
        if(this.props.error.length > 0){
            return <Alert color="danger" className={'text-center'}>{this.props.error}</Alert>
        }
    }

    renderButton = () => {
        if(this.props.loading){
            return <Alert color="warning">Loading...</Alert>
        }
        return <input type="button" onClick={this.onBtnRegisterClick} name="submit" id="submit" className="submit" defaultValue="Sign Me Up !" />
    }

    onBtnRegisterClick = () => {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var phone = this.refs.email.value;
        var password = this.refs.password.value;

        this.props.onUserRegister({username, email, phone, password});
    }
    render(){
        if(this.props.username === ""){
            return(
                <div className="main">
                    <div className="container">
                        <form className="registration-form" id="registration-form">
                            <h2>Sign Up for FREE !</h2>
                            <div className="form-group-1">
                                <input ref="username" type="text" name="name" id="name" placeholder="Username" required />
                                <input ref="email" type="email" name="email" id="email" placeholder="Email" required />
                                <input ref="phone" type="number" name="phone_number" id="phone_number" placeholder="Phone number" required />
                                <input ref="password" type="text" name="password" id="password" placeholder="Your Password" required />
                            </div>
                            <div className="form-submit">
                                {this.renderError()}
                                {this.renderButton()}
                            </div>
                        </form>
                    </div>
                </div>
            );
        }

        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return {username: state.auth.username, 
        error: state.auth.error, 
        loading: state.auth.loading };
}

export default connect(mapStateToProps, { onUserRegister })(RegisterKu);