import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
// import axios from 'axios'
// import apiconfig from '../../../configs/api.config.json'

class ViewCompany extends React.Component {
    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader> View Unit</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    {/* <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> Kode Buku : </label>
                        <input type="text" class="form-control" readOnly
                        name="code" 
                        value={this.props.company.kode_buku} 
                        onChange={this.changeHandler} />
                    </div>
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> Nama Buku : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="name" 
                        value={this.props.company.nama_buku} 
                        onChange={this.changeHandler} />
                    </div>
                
                    <div class ="input-group mb-3 input-group-sm"> 
                        <label for="text"> kode Pengarang : </label>
                        <input type="text" class="form-control" placeholder="email" readOnly
                        name="email" 
                        value={this.props.company.kode_pengarang} 
                        onChange={this.changeHandler}/>
                    </div>
                    <div class ="input-group mb-3 input-group-sm"> 
                        <label for="text"> Kode Penerbit : </label>
                        <input type="text" class="form-control" placeholder="Type address" readOnly
                        name="address" 
                        value={this.props.company.kode_penerbit} 
                        onChange={this.changeHandler}/>
                    </div>
                    
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text"> Kode Type Buku : </label>
                        <input type="text" class="form-control" placeholder="phone" readOnly
                        name="phone" 
                        value={this.props.company.kode_type_buku} 
                        onChange={this.changeHandler}/>
                   </div> */}

                   <center>
                        <table width="80%">
                            <tr>
                                <td width="40%">Kode Buku</td>
                                <td width="5%"> : </td>
                                <td width="65%" onChange={this.changeHandler}>{this.props.company.kode_buku}</td>
                            </tr>
                            <tr>
                                <td width="40%">Judul Buku</td>
                                <td width="5%"> : </td>
                                <td width="65%" onChange={this.changeHandler}>{this.props.company.nama_buku}</td>
                            </tr>
                            <tr>
                                <td width="40%">Kode Penerbit</td>
                                <td width="5%"> : </td>
                                <td width="65%" onChange={this.changeHandler}>{this.props.company.kode_penerbit}</td>
                            </tr>
                            <tr>
                                <td width="40%">Kode Pengarang</td>
                                <td width="5%"> : </td>
                                <td width="65%" onChange={this.changeHandler}>{this.props.company.kode_pengarang}</td>
                            </tr>
                            <tr>
                                <td width="40%">Kode Type Buku</td>
                                <td width="5%"> : </td>
                                <td width="65%" onChange={this.changeHandler}>{this.props.company.kode_type_buku}</td>
                            </tr>
                        </table>
                    </center>
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.closeModalHandler}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ViewCompany