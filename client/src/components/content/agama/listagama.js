import React from 'react'
// import API from '../../../helpers/API';
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
// import EditMenu from './editmenu';
// import CreatMenu from './creatmenu';
import { Alert } from 'reactstrap'
// import DeleteMenu from './deletemenu'



class ListAgama extends React.Component {
    constructor(props){
      
        super(props)
        this.state={
            formdata:{
                kode_agama:'',
                deskripsi:''
            },
            showCreateagama:false,
            agama:[],
            currentAgama: {},
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
        this.deleteModalHandler = this.deleteModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    deleteModalHandler(agamaid) {
        let tmp = {}
        this.state.agama.map((ele) => {
            if (agamaid === ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentAgama : tmp,
            deleteAgama : true
        })
    }

    editModalHandler(agamaid) {
        let tmp = {}
        this.state.agama.map((ele) => {
            if (agamaid === ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentAgama : tmp,
            editAgama : true
        })
    }

    closeModalHandler() {
        this.setState({
            editAgama : false,
            deleteAgama : false    
        })
    }

    showHandler(){
        this.setState({showCreateagama:true})
    }

    closeHandler(){
        this.setState({showCreateagama:false})
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
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.AGAMA,
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
                this.props.history.push('/listagama')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }

    getListAgama() {
        // alert()
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.AGAMA,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                agama: response.data.message
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.getListAgama()
    }
    modalStatus(status, message) {
        this.setState({
            alertData : {
                status : status,
                message : message
            },
            editAgama : false,
            deleteAgama : false    
        })
        this.getListAgama()
    }

    render(){
    return (
        <div>
        <ul className="breadcrumb">
            <li><a href="/welcome">Home</a> <span className="divider">/</span></li>
            <li><a href="/listmenu">Master</a> <span class="divider">/</span></li>
            <li className="active">List Agama</li>
        </ul>
       
        <div className="container">

            <h4>List Agama</h4>

             {(this.state.alertData.status === 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''}
            {(this.state.alertData.status === 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''}
                {/* <CreatMenu
                    show = {this.state.showCreateMenu}
                    closeHandler={this.closeHandler} />
                <DeleteMenu
                    delete = {this.state.deletemenu}
                    menu = {this.state.currentMenu}
                    closeModalHandler = {this.closeModalHandler}
                    modalStatus = {this.modalStatus}
                 />
                <EditMenu
                    edit = {this.state.editmenu}
                    closeModalHandler = {this.closeModalHandler}
                    company = {this.state.currentMenu} 
                    modalStatus = {this.modalStatus}
                /> */}
                <br/> <br/>
                <form className="form-inline">
                    <div className ="container">
                        {/* <input type="text" placeholder="Kode Buku" className="col-sm-2 padding=5px" id="text"/>
                        <input type="text" placeholder="Nama Buku" className="col-sm-2 padding=5px" id="text"/>
                        <input type="text" placeholder="Kode Pengarang" className="col-sm-2 padding=5px" id="text"/>
                        <input type="text" placeholder="Kode Penerbit" className="col-sm-2 padding=5px" id="text"/>
                        <input type="text" placeholder="Kode type Buku" className="col-sm-2 padding=5px" id="text"/>
                        
                        <button type="button" className="btn btn-warning ml-3" 
                            onClick ={this.searchHandler}> Search </button> */}
                        <button type="button" className="btn btn-primary float-right"
                            onClick ={this.showHandler}> Add </button>
                    </div>
                </form>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Kode Agama</th>    
                        <th>Deskripsi</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {this.state.agama.map((ele,x)=>
                                <tr>
                                  <td>{x+1}</td>
                                  <td>{ele.kode_agama}</td>
                                  <td>{ele.deskripsi}</td>
                                  <td>
                                  <Link to='#'>    
                        
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

export default ListAgama