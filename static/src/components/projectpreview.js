import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";

class Projectpreview extends Component{
    render(){
        return(            
            <div class="container border" style={{backgroundColor:"#3D3D3D",color:"#CBCBCB", borderRadius:"10px",marginBottom:"5px"}}>
                <Link to={`/${this.props.creator}/projects/${this.props.id}`} style={{ textDecoration: 'none'}}>
                    <div class="row">
                        <div class="col-8">
                            <div class="row">
                                <div class="col grow border border-top-0 border-left-0 text-center" style={{borderBottomRightRadius:"10px"}}>
                                    <b style={{fontSize:"24px"}}>{this.props.title}</b><br/>
                                    <b style={{fontSize:"16px"}}>by {this.props.creator}</b>
                                </div>
                                <div class="col" style={{fontSize:"25px"}}>
                                    <span class="badge badge-primary">{this.props.tag1}</span>
                                    <span class="badge badge-success" style={{marginLeft:"5px"}}>{this.props.tag2}</span>
                                    <span class="badge badge-danger" style={{marginLeft:"5px"}}>{this.props.tag3}</span>
                                    <span class="badge badge-warning" style={{marginLeft:"5px"}}>{this.props.numberoftags < 4 ? "" : `+${this.props.numberoftags-3} more Tags`}</span>
                                    <span class="badge badge-info" style={{marginLeft:"5px"}}>{this.props.numberofpictures} Pictures</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    {this.props.description}
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col">
                                    <img src={this.props.img1} class="rounded" style={{width:"100%", marginTop:"10px", marginBottom:"10px"}}></img>
                                </div>
                                <div class="col">
                                    <img src={this.props.img2} class="rounded" style={{width:"100%", marginTop:"10px", marginBottom:"10px"}}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>   
        );
    }
}

export default Projectpreview;