import React from 'react'
import {Link} from 'react-router-dom'
import {Nav} from 'reactstrap'
// import {MdClearAll} from 'react-icons/md'


class Header extends React.Component {

    // handleSidebarControlButton = event => {
    //     event.preventDefault();
    //     event.stopPropagation();
    
    //     document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
    //   };

    onSignOut() {       
           
            localStorage.clear();           
            this.props.history.push('/')               
    }
    render() {
        return (
            <Nav className="Navbar Navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                {/* <Button outline onClick={this.handleSidebarControlButton}>
                    <MdClearAll size={25} />
                        </Button> */}
                        <a className="Navbar-brand col-sm-3 col-md-2 mr-0">Batch 168 - Mini Project Apps</a>
                            <ul className="Navbar-Nav px-5">
                             <li className="Nav-item text-nowrap">
                        <Link className="nav-link" to="" onClick={this.onSignOut}>Sign out</Link>
                    </li>
                </ul>
            </Nav>
        )
    }
}

export default Header