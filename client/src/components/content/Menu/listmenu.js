import React from 'react'
// import API from '../../../helpers/API';
import apiconfig from '../../../configs/api.config.json'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditMenu from './editmenu';
import CreatMenu from './creatmenu';
import { Alert } from 'reactstrap'
import DeleteMenu from './deletemenu'



class ListMenu extends React.Component {
    constructor(props){
      
        super(props)
        this.state={
            formdata:{
                kode_menu:'',
                nama_menu:'',
                url_menu:''
            },
            showCreateMenu:false,
            menu:[],
            currentMenu: {},
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

    deleteModalHandler(menuid) {
        let tmp = {}
        this.state.menu.map((ele) => {
            if (menuid === ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentMenu : tmp,
            deletemenu : true
        })
    }

    editModalHandler(menuid) {
        let tmp = {}
        this.state.menu.map((ele) => {
            if (menuid === ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentMenu : tmp,
            editmenu : true
        })
    }

    closeModalHandler() {
        this.setState({
            editmenu : false,
            deletemenu : false    
        })
    }

    showHandler(){
        this.setState({showCreateMenu:true})
    }

    closeHandler(){
        this.setState({showCreateMenu:false})
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
                this.props.history.push('/listmenu')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }

    getListMenu() {
        // alert()
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MENU,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                menu: response.data.message
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.getListMenu()
    }
    modalStatus(status, message) {
        this.setState({
            alertData : {
                status : status,
                message : message
            },
            editmenu : false,
            deletemenu : false    
        })
        this.getListMenu()
    }

    render(){
    return (
        <div>
        <ul className="breadcrumb">
            <li><a href="/welcome">Home</a> <span class="divider">/</span></li>
            <li className="active">Master<span class="divider"></span></li>
        </ul>
       
        <div className="container">

            <h4>List Menu</h4>

             {(this.state.alertData.status === 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''}
            {(this.state.alertData.status === 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''}
                <CreatMenu
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
                />
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
                        <th>Kode Menu</th>    
                        <th>Nama Menu</th>
                        <th>Path</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {this.state.menu.map((ele,x)=>
                                <tr>
                                  <td>{x+1}</td>
                                  <td>{ele.kode_menu}</td>
                                  <td>{ele.nama_menu}</td>
                                  <td>{ele.url_menu}</td>
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

export default ListMenu