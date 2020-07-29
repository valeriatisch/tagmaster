import React from "react";
import { Link } from 'react-router-dom';
import Projects from "../pages/projects";
import Impressum from "../pages/impressum";
import Contact from "../pages/contact";
import "../css/footer.css";
import { Container, Row, Col, Navbar } from "react-bootstrap"

const Footer = () => (
    <footer class="footer">
      <div class="container">       
        <div class="text-center">
          <div class="row ">
            <a class="col"> <Link to="/contact">       
                Contact
            </Link>
            </a>
            <a class="col" href="https://github.com/valeriatisch/tagmaster">
                Github
            </a>
            <a class="col"> <Link to="/impressum">
                About
            </Link>
            </a>
          </div>
          <div class="row ">
            <div class="col-sm footer-copy">
              &copy; {new Date().getFullYear()} Copyright Tagmaster
            </div>
          </div>
        </div>
      </div>
    </footer>
);

export default Footer;