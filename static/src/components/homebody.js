import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Body extends Component{
    render(){
        return(
            <div class="container text-center" style={{marginTop:"30px"}}>
                <style>{'button:hover { border: none}'}</style>
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
                        <br/>
                        <Link to="/login">
                            <button type="button" class="btn btn-secondary btn-lg" role="button" aria-pressed="true" style={{marginTop:"10px",width:"150px",color:"#efeb53",backgroundColor:"#282828",borderColor:"#efeb53"}}>Log in</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Body;