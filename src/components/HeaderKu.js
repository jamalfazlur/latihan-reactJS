    import React, { Component }  from 'react';
    import { Link } from 'react-router-dom';
    import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
    import { connect } from 'react-redux';
    import Cookies from 'universal-cookie';
    import { onUserLogout, keepLogin } from '../actions';

    const cookies = new Cookies();

    class HeaderKu extends Component {
        constructor(props) {
            super(props);
        
            this.toggle = this.toggle.bind(this);
            this.state = {
              isOpen: false
            };
          }
        toggle() {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }

        

        onLogoutClick = () => {
            this.props.onUserLogout();
            cookies.remove('myPengguna');
        }

        render() {
            if (this.props.username === ""){
                return (
                    <div >
                        <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
    
                        <Collapse isOpen={this.state.isOpen} navbar>
                            {/* <Nav navbar>
                                <NavItem>
                                    <NavLink><Link to="/produk">Products</Link></NavLink>
                                </NavItem>
                            </Nav> */}
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink><Link to="/register">Register</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to="/login">Login</Link></NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        </Navbar>
                    </div>
                )
            }
            
            return (
                
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />

                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav navbar>
                                <NavItem >
                                    <NavLink href="/produk"><i class="fas fa-align-justify"> </i> PRODUCTS</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Hello, {this.props.username}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem><Link to="/keranjang"><i class="fas fa-shopping-cart"></i> Keranjang</Link></DropdownItem>
                                        <DropdownItem><Link to="/history"><i class="fas fa-history"></i> History Belanja</Link></DropdownItem>
                                        <DropdownItem> <Link to="/manageproduk"><i class="fas fa-cogs"></i> Manage Produk</Link></DropdownItem>
                                        <DropdownItem onClick={this.onLogoutClick}><i class="fas fa-sign-out-alt"></i> Logout </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            username: state.auth.username
        }
    }

    export default connect(mapStateToProps, {onUserLogout, keepLogin})(HeaderKu);