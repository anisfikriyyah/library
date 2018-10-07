import React from 'react'
// import API from '../../../helpers/API';
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditCompany from './Editbuku';
import CreateCompany from './Creatbuku';
import { Alert } from 'reactstrap'
import DeleteCompany from './Deletebuku'
import ViewCompany from './Viewbuku'



class ListBuku extends React.Component {
    constructor(props){
      
        super(props)
        this.state={
            formdata:{
                kode_buku: '',
                nama_buku: '',
                kode_penerbit:'',
                kode_pengarang:'',
                kode_type_buku: ''
            },
            showCreateBuku:false,
            buku:[],
            pengarang:[],
            penerbit:[],
            type_buku:[],
            currentBuku: {},
            alertData: {
                status: 0,
                message: ''
            }
        }
        this.showHandler=this.showHandler.bind(this)
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
        this.unitHandler=this.unitHandler.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.closeHandler=this.closeHandler.bind(this)
        // this.deleteHandler=this.deleteHandler.bind(this)
        this.deleteModalHandler = this.deleteModalHandler.bind(this)
        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    deleteModalHandler(bukuid) {
        let tmp = {}
        this.state.buku.map((ele) => {
            if (bukuid === ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentBuku : tmp,
            deleteBuku : true
        })
    }


    viewModalHandler(bukuid) {
        let tmp = {}
        this.state.buku.map((ele) => {
            if (bukuid === ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentBuku : tmp,
            viewBuku : true
        })
    }

    editModalHandler(bukuid) {
        let tmp = {}
        this.state.buku.map((ele) => {
            if (bukuid === ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentBuku : tmp,
            editBuku : true
        })
    }

    closeModalHandler() {
        this.setState({
            viewBuku : false,
            editBuku : false,
            deleteBuku : false    
        })
    }

    showHandler(){
        this.setState({showCreateBuku:true})
    }

    closeHandler(){
        this.setState({showCreateBuku:false})
    }

    changeHandler(e){
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    
    unitHandler(e){
        let tmp=this.state.formdata
        tmp.m_unit_id=e.target.value
        this.setState({
            formdata:tmp
        })
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
                this.props.history.push('/dashboard')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }
    getListCompany() {
        // alert()
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                buku: response.data.message
                
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
                type_buku: response.data.message
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    componentDidMount(){
        this.getListCompany()
        this.getListPengarang()
        this.getListPenerbit()
        this.getListType()
    }
    // deleteHandler(param){
    //     let token = localStorage.getItem(apiconfig.LS.TOKEN)
    //     let option = {
    //         url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY+'/'+this.state.param,
    //         method: "delete",
    //         headers: {

    //             "Authorization": token
    //         }
    //     }
    //     axios(option)
    //     .then((response)=>{
    //         let currentindex = -1
    //         this.state.buku.map((ele, idx)=>{
    //             if(ele._id===param){
    //                 currentindex=idx
    //                 this.props.history.goBack()
    //             }
    //         })
    //         let tmp=this.state.buku
    //         tmp.splice(currentindex,1)
    //         this.setState({
    //             buku: tmp
    //         })
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // }
    modalStatus(status, message) {
        this.setState({
            alertData : {
                status : status,
                message : message
            },
            viewBuku : false,
            editBuku : false,
            deleteBuku : false    
        })
        this.getListUnit()
    }

    render(){
    return (
        <div>
        <ul className="breadcrumb">
            <li><a href="/welcome">Home</a> <span class="divider">/</span></li>
            <li><a href="/listmenu">Master</a> <span class="divider">/</span></li>
            <li className="active">List Buku</li>
        </ul>
       
        <div className="container">

            <h4>List Buku</h4>

             {(this.state.alertData.status === 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''}
            {(this.state.alertData.status === 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''}
                <CreateCompany
                    show = {this.state.showCreateBuku}
                    closeHandler={this.closeHandler}
                    buku ={this.state.buku} />
                <ViewCompany
                    view = {this.state.viewBuku}
                    closeModalHandler = {this.closeModalHandler} 
                    company = {this.state.currentBuku}
                />
                <DeleteCompany
                    delete = {this.state.deleteBuku}
                    company = {this.state.currentBuku}
                    closeModalHandler = {this.closeModalHandler}
                    modalStatus = {this.modalStatus}
                 />
                <EditCompany
                    edit = {this.state.editBuku}
                    closeModalHandler = {this.closeModalHandler}
                    company = {this.state.currentBuku} 
                    modalStatus = {this.modalStatus}
                    pengarang = {this.state.pengarang}
                    penerbit = {this.state.penerbit}
                    type_buku = {this.state.type_buku}
                />
                <br/> <br/>
                <form className="form-inline">
                    <div className ="container">
                        <input type="text" placeholder="Kode Buku" className="col-sm-2 padding=5px" id="text"/>
                        <input type="text" placeholder="Nama Buku" className="col-sm-2 padding=5px" id="text"/>
                        <input type="text" placeholder="Kode Pengarang" className="col-sm-2 padding=5px" id="text"/>
                        <input type="text" placeholder="Kode Penerbit" className="col-sm-2 padding=5px" id="text"/>
                        <input type="text" placeholder="Kode type Buku" className="col-sm-2 padding=5px" id="text"/>
                        
                        <button type="button" className="btn btn-warning ml-3" 
                            onClick ={this.searchHandler}> Search </button>
                        <button type="button" className="btn btn-primary float-right"
                            onClick ={this.showHandler}> Add </button>
                    </div>
                </form>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Kode Buku</th>    
                        <th>Nama Buku</th>
                        <th>Nama Pengarang</th>
                        <th>Nama Penerbit</th>
                        <th>Nama Type Buku</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {this.state.buku.map((ele,x)=>
                                <tr>
                                  <td>{x+1}</td>
                                  <td>{ele.kode_buku}</td>
                                  <td>{ele.nama_buku}</td>
                                  <td>{ele.nama_pengarang}</td>
                                  <td>{ele.nama_penerbit}</td>
                                  <td>{ele.deskripsi}</td>
                                  <td>
                                  <Link to='#'>
                        <span onClick = {() => {this.viewModalHandler(ele._id)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />    
                        
                        <span onClick = {() => {this.editModalHandler(ele._id)}} className="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                        
                        <span onClick = {() => {this.deleteModalHandler(ele._id)}} className="fa fa-trash" style={{fontSize : '18px'}} />
                            
                      </Link>
                    </td>
                                </tr>    
                            )}
                    </tbody>
                </table>
                </div>
                </div>
        )
    }
}

export default ListBuku