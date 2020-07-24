import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Impressum from "../pages/impressum";
import Contact from "../pages/contact";
import Logout from "../pages/logout";
import Login from "../pages/login";
import newProject from "../pages/newProject";
import logo from '../ressources/navbar-logo.png';
import Projects from "../pages/projects.js";
import Accountpage from "../pages/accountpage";
import { Nav,Navbar } from "react-bootstrap";
import Label from "../pages/label";
import ProjectPage from "../pages/projectpage";

class ownNavbar extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
		};
	}

	componentWillMount() {
		if (
			sessionStorage.getItem("access_token") != null &&
			sessionStorage.getItem("id_token") != null
		) {
			this.setState({ loggedIn: true });
		} else {
			this.setState({ loggedIn: false });
		}
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

    render() {
        return (
            <>
			<style>
				{".login-button{width:150px;border:1px solid #efeb53;text-align:center;background-color:#282828;color:#efeb53} .login-button:hover{background-color:#3F3F3F;color:#efeb53}"}
			</style>
            <Navbar expand="md" style={{backgroundColor:"#191919",borderBottom:"1px solid #454545"}}>
                <Navbar.Brand href="/" style={{marginTop:"-5px"}}><img src={logo} height="50"/></Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" style={{width:"70px",borderColor:"#efeb53",backgroundColor:"#3F3F3F"}}/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto" style={{}}>
						<Nav.Link href="/" style={{color:"#efeb53"}}>Home</Nav.Link>
						<Nav.Link href="/user/projects" style={{color:"#efeb53"}}>Projects</Nav.Link>
						<Nav.Link href="/contact" style={{color:"#efeb53"}}>Contact</Nav.Link>
						<Nav.Link href="/impressum" style={{color:"#efeb53"}}>About</Nav.Link>
					</Nav>
					<Nav className="navbar-right">
						{this.state.loggedIn == true ? (
							<Link to={"/logout"} className="nav-link">
								{" "}
								Logout{" "}
							</Link>
						) : (
							<Link to={"/login"}>
								<button type="button" class="btn btn-lg login-button" role="button" aria-pressed="true">Log in</button>
							</Link>
						)}
					</Nav>
				</Navbar.Collapse>
            </Navbar>
            
            <Switch>
                <Route path="/login" component={Login} />
                <Route exact path="/" component={Home} />
                <Route path="/impressum" component={Impressum} />
                <Route path="/contact" component={Contact} />
                <Route path="/logout" component={Logout} />
                <Route path="/user/newProject" component={newProject} />
                <Route exact path="/user/projects" component={Projects} />
                <Route path="/accountpage" component={Accountpage} />
                <Route path="/label" component={Label} />
				<Route path="/user/project" component={ProjectPage} />
            </Switch>
            </>
        );
    }
}

export default ownNavbar;
