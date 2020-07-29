import React from "react";
import { Link } from 'react-router-dom';
import Projects from "../pages/projects";
import Impressum from "../pages/impressum";
import Contact from "../pages/contact";
import "../css/footer.css";

const Footer = () => (
    <body>
        <div class="container col-auto"></div>
        <footer>
            <section>
                <div class="foot-main text-center">
                    <div class="row foot-main-list">
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
                        <br />
                    </div>
                </div>
            </section>
            <section>
                <div class="foot-copyright text-center">
                    &copy; {new Date().getFullYear()} Copyright Tagmaster
            </div>
            </section>
        </footer>
    </body>
);

export default Footer;