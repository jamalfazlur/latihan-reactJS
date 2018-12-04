import React, { Component }  from 'react';

class KontenKu extends Component {
    render() {
        return (
            <div>
                <center>
                    <h2>{this.props.teksKonten}</h2>
                    
                    {/* <input type={'button'} value={' Klik '} class={'btn btn-warning' }/> */}
                   
                </center>
            </div>
        )
    }
}

export default KontenKu;