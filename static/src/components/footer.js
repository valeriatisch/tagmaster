import React from "react";
import { Link } from 'react-router-dom';
import Projects from "../pages/projects";
import Impressum from "../pages/impressum";
import Contact from "../pages/contact";


const Footer = () => (
    
  <div class="container col-auto" style={{position:"absolute",right: "0",bottom: "0",left:"0", paddingTop:"20px", marginTop:"80px",height: "100px",width:"100%",backgroundColor:"#585858",fontSize:"20px",color:"#000000", fontWeight:"bold"}}>
  
  <div class="container text-center" >
  
   
    <div class="row">
                    <a class="col-sm"> <Link to="/projects">
                            Projects
                        </Link>
                    </a>
                    <a class="col-sm"> <Link to="/contact">
                            Contact
                        </Link>
                    </a>
                    <a class="col-sm"> <Link to="/impressum">
                            About
                        </Link>
                    </a>   
                        <br/>
            </div>
            
        </div>
        
    </div>  
);
