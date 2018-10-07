import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class CreateCompany extends React.Component{
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
                kode_buku:'',
                nama_buku:'',
                kode_pengarang:'',
                kode_penerbit:'',
                kode_type_buku:'',
                created_by:userdata.username
            },
            pengarang:[],
            penerbit:[],
            type:[]
        }
        // let number=this.state.company.length
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
        this.autoCode=this.autoCode.bind(this)
    }

    autoCode(){
        let kode, tmp = this.state.formdata
        this.props.buku.forEach((ele, key) => {
            return kode = key + 2
        });

        if (kode < 10) tmp.kode_buku = `B00${kode}`
            else if (kode < 100) tmp.kode_buku = `B0${kode}`
                else if (kode < 1000) tmp.kode_buku = `B${kode}`

                    if (typeof tmp == Object) {
                        this.setState({
                            formdata: tmp
                        })
                    }
                    return this.state.formdata.kode_buku
    }
    
    changeHandler(e){
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }

    getListType() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.TYPE,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                type: response.data.message
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    getListPengarang() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.PENGARANG,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                pengarang: response.data.message
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    getListPenerbit() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.PENERBIT,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                penerbit: response.data.message
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.getListPengarang()
        this.getListPenerbit()
        this.getListType()
    }

    submitHandler(){
       
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
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
                this.props.history.push('/dashboard')
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
                <ModalHeader> Add Buku</ModalHeader>
                <ModalBody >
                <form className="form-inline">
                <div className ="input-group mb-3 input-group-sm">
                    <label for="text">Kode Buku</label>
                    <input type="text" className="form-control" placeholder="Kode Buku" 
                    name="kode_buku" value={this.autoCode()} readOnly />
                    <label for="text">Nama Buku</label>
                    <input type="text" className="form-control" placeholder="Nama Buku" 
                    name="nama_buku" value={this.state.formdata.nama_buku} onChange={this.changeHandler} required/>
                     </div>
                    </form>
                    <form className="form-inline">
                    <div className ="input-group mb-3 input-group-sm">
                    <label for="text">Nama Pengarang</label>
                     <select className = "form-control" name="kode_pengarang" onChange={this.changeHandler} required>
                        <option selected disabled>
                            Pilih Nama Pengarang
                        </option>
                    {
                        this.state.pengarang.map((ele,x)=>
                        <option value={ele.kode_pengarang}> {ele.nama_pengarang} </option>
                        )
                    }
                    </select>
                    </div>
                    </form>
                    <form className="form-inline">
                    <div className ="input-group mb-3 input-group-sm">
                    <label for="text">Nama Penerbit</label>
                    <select className="form-control" name="kode_penerbit" onChange={this.changeHandler} required>
                        <option selected disabled>
                            Pilih Nama Penerbit
                        </option>
                        {
                            this.state.penerbit.map((ele,x)=>
                            <option value={ele.kode_penerbit}> {ele.nama_penerbit} </option>
                            )
                        }
                    </select>
                   </div>
                   <form className="form-inline">
                    <div className ="input-group mb-3 input-group-sm">
                    <label for="text">Kode Type Buku</label>
                    {/* <input type="text" class="form-control" placeholder="Kode Type Buku" 
                    name="kode_type_buku" value={this.state.formdata.kode_type_buku} onChange={this.changeHandler} required/> */}
                    <select className="form-control" name="kode_type_buku" onChange={this.changeHandler} required>
                        <option selected disabled>
                        Pilih Type Buku
                        </option>
                        {
                            this.state.type.map((ele,x)=>
                            <option value={ele.kode_type_buku}> {ele.deskripsi} </option>
                            )
                        }
                    </select>
                    </div>
                    </form>
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
// debugger
export default CreateCompany