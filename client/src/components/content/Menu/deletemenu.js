import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class DeleteMenu extends React.Component {
    constructor(props) {
        super(props)
        this.deleteHandler = this.deleteHandler.bind(this)
    }
    deleteHandler(){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MENU,
            // +'/'+this.state._id,
            method: "delete",
            headers: {
                "Authorization": token
            },
            data: this.props.menu
        }
        debugger
        axios(option)
        .then((response) => {
            if (response.data.code === 200) {
                this.props.modalStatus(1, 'Success')
            } else {
                this.props.modalStatus(2, 'Failed')
            }
        })
        .catch((error) => { 
            console.log(error)
        })
    }

    render(){
        return(
            <Modal isOpen={this.props.delete} className={this.props.className}>
                <ModalHeader> Delete Menu </ModalHeader>
                <ModalBody >
                    <p> Delete Data </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.deleteHandler}>Yes</Button>
                    <Button color="danger" onClick={this.props.closeModalHandler}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default DeleteMenu