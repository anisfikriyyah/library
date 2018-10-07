import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class CreateMenu extends React.Component{
    constructor (props){
        super(props)
        // let number=this.props.company
        // console.log(number)
        //let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        // let userdata=""
       
        // if(localStorage.getItem(apiconfig.LS.TOKEN)!=null){
         let userdata =JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        //}
        this.state={
            formdata:{
                kode_menu:'',
                nama_menu:'',
                url_menu:'',
                created_by:userdata.username
            }
        }
        // let number=this.state.company.length
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
    }
    changeHandler(e){
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    submitHandler(){
       
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MENU,
            method: "post",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
        }
        axios(option)
        .then((response)=>{
            if(response.data.code===200){
                alert('Success')
                 //console.log(response)
                this.props.history.push('/listmenu')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }
    render(){
        return(
            
            <Modal isOpen={this.props.show} className={this.props.className}>
                <ModalHeader> Add Menu</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                <div class ="input-group mb-3 input-group-sm">
                    <label for="text">Kode Menu</label>
                    <input type="text" class="form-control" placeholder="Kode menu" 
                    name="kode_menu" value={this.state.formdata.kode_menu} onChange={this.changeHandler} />
                    <label for="text">Nama Menu</label>
                    <input type="text" class="form-control" placeholder="Nama menu" 
                    name="nama_menu" value={this.state.formdata.nama_menu} onChange={this.changeHandler} required/>
                    <label for="text">PAth</label>
                    <input type="text" class="form-control" placeholder="Nama Url" 
                    name="url_menu" value={this.state.formdata.url_menu} onChange={this.changeHandler} required/>
                </div>
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeHandler}>Cancel</Button>
                </ModalFooter>
        </Modal>
        )
    }
}
export default CreateMenu