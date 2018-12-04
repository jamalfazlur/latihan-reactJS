import React, { Component } from 'react';
import { Input } from 'reactstrap';

class InputKu extends Component {
    render() {
        return (
            <input type={this.props.type} ref={this.props.innerRef} />
        )
    }
}

export default InputKu;