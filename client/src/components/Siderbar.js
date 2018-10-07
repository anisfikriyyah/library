import React from 'react';
import apiconfig from '../configs/api.config.json';
import axios from 'axios';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

class Sidebar extends React.Component {
    constructor(props){
      
        super(props)

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleNavbarsatu = this.toggleNavbarsatu.bind(this);
        this.state={
            Menu:[],
            alertData: {
                status: 0,
                collapsed: 0,
                collapsed1: 0,
                message: '',
                dropdownOpen : false
            }
            // unit:[]
        };
        
      
    }
    getListMenu() {
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
                Menu: response.data.message
                
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.getListMenu()
    }
    toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
    }
    toggleNavbarsatu() {
        this.setState({
          collapsed1: !this.state.collapsed1
        });
    }
    render() {
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    
                    <Navbar color="faded" light><strong><h5> Master</h5></strong>
                    {/* <NavbarBrand className="bg-light col-md-2">Master</NavbarBrand> */}
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-8" />
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav navbar>
                        <NavItem>
                            
                            {this.state.Menu.map((ele,x)=>
                                 <NavLink href={ele.url_menu}>{ele.nama_menu}</NavLink>
                                 )} 
                        </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>

                    <Navbar color="faded" light><strong><h5> Transaction</h5> </strong>
                    {/* <NavbarBrand href="/listmenu" className="mr-auto bg-light">Transaction</NavbarBrand> */}
                    <NavbarToggler onClick={this.toggleNavbarsatu} className="mr-8" />
                    <Collapse isOpen={this.state.collapsed1} navbar>
                        <Nav navbar>
                        <NavItem>
                            {this.state.Menu.map((ele,x)=>
                            // {
                            //     if(ele.code === ele.p_code){
                            //     return
                                <NavLink href={ele.url_menu}>{ele.nama_menu}</NavLink>
                            // }}
                            )} 
                        </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            </nav>
        )
    }

}

export default Sidebar