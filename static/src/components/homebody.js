import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Register from "../pages/accountpage";

class Body extends Component{
    render(){
        return(
            <div class="container text-center" style={{marginTop:"30px",marginBottom:"20px"}}>
                <style>{'.button1{ margin-top:10px; width:150px; color:#efeb53; background-color:#282828; border: 1px solid #efeb53 } .button1:hover { background-color:#3F3F3F; color:#efeb53; border: 1px solid }'}</style>
                <div class="row">
                    <div class="col-sm">
                        <h1>Uploading</h1>
                        You can create your own projects, to which you can upload photos with your own custom labels.
                        Getting data for your AI was never this easy!
                    </div>
                    <div class="col-sm">
                        <h1>Labelling</h1>
                        You can browse through countless pictures to label them as intuitively as never before.
                    </div>
                    <div class="col-sm">
                        <h1>Get started</h1>
                        The best thing about it? It's completely free. So why don't you try it out right now?
                    </div>
                </div>
            </div>
        );
    }
}
export default Body;