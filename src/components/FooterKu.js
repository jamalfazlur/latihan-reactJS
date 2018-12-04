import React, { Component } from 'react';

class FooterKu extends Component {
    render() {
        return (
            <div>
                <center></center>
                <center>{this.props.children}</center>
            </div>
        )
    }
}

export default FooterKu;