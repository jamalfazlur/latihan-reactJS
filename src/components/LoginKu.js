import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Form, Button, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onUserLogin } from '../actions';
// import '../support/css/font-awesome.min.css';
const cookies = new Cookies();

class LoginKu extends Component {

    componentWillReceiveProps(newProps) {
        // console.log('Will receive props has been triggered')
        if(newProps.username !== '') {
            cookies.set('myPengguna', newProps.username, {path: '/'})
        }
    }

    onBtnLoginClick = () => {
        var username = this.refs.username.refs.tbUsername.value;
        var password = this.refs.password.refs.tbPassword.value;
        this.props.onUserLogin({username, password});
        // console.log(password);
        // this.setState({ username })
    }

    renderError = () => {
        if(this.props.error.length > 0){
            return <Alert color="danger">{this.props.error}</Alert>
        }
    }

    renderButton = () => {
        if(this.props.loading){
            return <center><i class="fas fa-spinner" /></center>
        }
        return <Button color="primary" 
                    onClick={this.onBtnLoginClick}>
                    Login
                </Button>
    }

    render(){
        if(this.props.username === ""){
            return (
                <div>
                    <center><h2>Ini Login Ku</h2></center>
                
                    <Form className="col-3" style={{margin: "0 auto"}}>
                        <FormGroup>
                        <Label for="exampleUsername">Username</Label>
                        <Input type="username" name="username" ref="username" innerRef="tbUsername" id="exampleUsername" placeholder="Input Username" />
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" ref="password" innerRef="tbPassword" id="examplePassword" placeholder="Keep your password secret :)" />
                        </FormGroup>
                       
                        {this.renderError()}
                                                
                        {this.renderButton()}

                    </Form>
                </div>
            );
        } 

        return <Redirect to="/" />
        
    }
}

const mapStateToProps = (state) => {
    return { 
        username: state.auth.username, 
        error: state.auth.error, 
        loading: state.auth.loading 
    };
}
// export default LoginKu;
export default connect(mapStateToProps, {onUserLogin})(LoginKu);