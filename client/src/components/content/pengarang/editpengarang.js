// import React from 'react'
// import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
// import axios from 'axios'
// import apiconfig from '../../../configs/api.config.json'

// class EditPengarang extends React.Component {
//     constructor (props) {
//         super(props)
//         // let userdata=""
//         // if(localStorage.getItem(apiconfig.LS.TOKEN)!= null){
//          let userdata =JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
//        // }        
       
//         super(props)
//         this.state = {
//             formdata: {
//                 kode_pengarang:'',
//                 nama_pengarang:'',
//                 umur:'',
//                 kode_agama:'',
//                 kode_kota:'',
//                 update_by:userdata.username
//             }
//         }
//         this.submitHandler = this.submitHandler.bind(this)
//         this.changeHandler = this.changeHandler.bind(this)
//     }

//     componentWillReceiveProps(newProps) {
//         console.log(newProps)
//         this.setState({
//             formdata : newProps.company
//         })
//     }

//     changeHandler(e) {
//         let tmp = this.state.formdata
//         tmp[e.target.name]=e.target.value
//         this.setState({
//             formdata:tmp
//         })
//     }

//     submitHandler() {
//         let token = localStorage.getItem(apiconfig.LS.TOKEN)
//         let option = {
//             url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.PENGARANG,
//             method: "put",
//             headers:{
//                 "Authorization": token,
//                 "Content-Type" : "application/json"
//             },
//             data: this.state.formdata
           
//         }
//         debugger
//         axios(option)
//         .then((response) => { 
//             // console.log(this.state.formdata)
//             if(response.data.code === 200) {
//                 alert('Success')
//                 this.props.history.push('/pengarang')
//             } else {
//                 alert(response.data.message)
//             }
//         })
//         .catch((error) => {
//             console.log(error);            
//         })
//     }

//     render(){
//         // console.log(this.state.formdata)
//         return(
//             <Modal isOpen={this.props.edit} className={this.props.className}>
//                 <ModalHeader> Edit Menu</ModalHeader>
//                 <ModalBody >
//                 <form class="form-inline">
//                     <div class ="input-group mb-3 input-group-sm">
//                         <label for="text"> Kode pengarang : </label>
//                         <input type="text" class="form-control" readOnly
//                         name="kode_pengarang" 
//                         value={this.state.formdata.kode_pengarang} 
//                         onChange={this.changeHandler} />
//                         <label for="text"> Nama pengarang : </label>
//                         <input type="text" class="form-control" 
//                         name="nama_pengarang" 
//                         value={this.state.formdata.nama_pengarang} 
//                         onChange={this.changeHandler} />
//                         <label for="text"> Umur : </label>
//                         <input type="text" class="form-control" 
//                         name="umur" 
//                         value={this.state.formdata.umur} 
//                         onChange={this.changeHandler} />
//                         <label for="text"> Kode Agama : </label>
//                         <input type="text" class="form-control" 
//                         name="kode_agama" 
//                         value={this.state.formdata.kode_agama} 
//                         onChange={this.changeHandler} />
//                         <label for="text"> Kode Kota : </label>
//                         <input type="text" class="form-control" 
//                         name="kode_kota" 
//                         value={this.state.formdata.kode_kota} 
//                         onChange={this.changeHandler} />
//                     </div>   
//                 </form>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="primary" onClick ={this.submitHandler}>Save</Button>
//                     <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
//                 </ModalFooter>
//             </Modal>
//         )
//     }
// }
// export default EditPengarang