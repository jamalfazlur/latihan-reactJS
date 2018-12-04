import React, { Component } from 'react';

class ManageItem extends Component{
    render(){
        const {id, merk,  desc, harga, img } = this.props.rowToEdit
        return(
            <tr>
                <td>${id}</td>
                <td><input ref="merkEdit" type="text" placeholder="Nama Produk" value={merk}  /></td>
                <td>
                    <select ref="kategoriEdit">
                        <option>Tisu</option>
                        <option>Obat</option>
                        <option>Minyak</option>
                    </select>
                </td>
                <td><input ref="hargaEdit" type="number" placeholder="Harga Produk" value={harga} /></td>
                <td><input ref="imgEdit" type="text" placeholder="Image Produk" value={img} /></td>
                <td><textarea ref="descEdit" placeholder="Type a description" rows="1">{desc}</textarea></td>
                <td><input type="button" class="btn btn-primary" value="Save" /></td>
                <td><input type="button" class="btn btn-default" value="Cancel" /></td>
            </tr>
        );
    }
}

export default ManageItem;