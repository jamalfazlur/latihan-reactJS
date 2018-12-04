/* 
Function Component
Class Componenet
*/
// import React  from 'react';



import React, { Component }  from 'react';

// const HeaderKu = () => {
//     return (
//         <div>
//             <h2>Ini Function Componenet HeaderKu.. Masa?</h2>
//         </div>
//     )
// }

// class HeaderKu extends React.Component {
class HeaderKu extends Component {
    
    state = { namaku : 'Jamal Fazlur', alamat: 'Depok Ujung'}

    render() {
        console.log('Ini Render');
        // console.log(this.state.namaku);
        console.log(this.state);
        var paragrafKu = "Hallo ini cuma coba bikin variable";
        return (
            <div>
                <h2>Ini Function Component HeaderKu..</h2>
                <h3>{this.state.namaku}</h3>
                <h3>{this.state.alamat}</h3>
                <p>{paragrafKu}</p>
                <h5> 100 / 5 + 10 = {100 / 5 + 10 }</h5>
            </div>
        )
    } /* render() */

    componentWillMount(){
        console.log('Ini Will Mount');
    } /* willMount() */

    componentDidMount(){
        console.log('Ini Did Mount');
        // this.setState({namaku: 'Farah Rohima', kuliah: 'Purwadhika'});
        // this.state.namaku = 'Farah Rohima';
        // this.setState({});
        this.setState({namaku:'Farah'})
    } /* didMount() */

    componentWillUpdate(){
        console.log('Ini Will Update');
    } /* willUpdate() */

    componentDidUpdate(){
        console.log('Ini Did Update');
    } /* didUpdate() */
    
}
export default HeaderKu;