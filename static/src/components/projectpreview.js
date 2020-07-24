import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col} from 'react-bootstrap';

class Projectpreview extends Component{
    render(){
        return(
            <Container style={{backgroundColor:"#3D3D3D",color:"#efeb53", borderRadius:"10px", marginBottom:"5px",width:"98%",border:"2px solid #efeb53"}}>
                <Link to={`/user/projects/id`} style={{ textDecoration: 'none'}}>
                    <Row>
                        <Col style={{border:"2px solid #efeb53",borderTop:"none",borderRight:"none",borderLeft:"none",textAlign:"center"}}>
                            <b style={{fontSize:"24px",color:"#efeb53"}}>{this.props.title}</b><br/>
                        </Col>
                    </Row>
                    <Row style={{marginBottom:"5px"}}>
                        <Col style={{fontSize:"20px",textAlign:"center"}}>
                            <span class="badge badge-primary">{this.props.tags[0]}</span>
                            <span class="badge badge-success" style={{marginLeft:"5px"}}>{this.props.tags[1]}</span>
                            <span class="badge badge-danger" style={{marginLeft:"5px"}}>{this.props.tags[2]}</span>
                            <span class="badge badge-warning" style={{marginLeft:"5px"}}>{this.props.tags.length < 4 ? "" : `+${this.props.tags.length-3} more Tags`}</span>
                            <span class="badge badge-info" style={{marginLeft:"5px"}}>{this.props.numberofpictures} Pictures</span> 
                        </Col>
                    </Row>
                    <Row style={{border:"2px solid #efeb53",borderBottom:"none",borderRight:"none",borderLeft:"none"}}>
                        <Col>
                            <img src={this.props.img1} class="rounded" style={{height:"90%",width:"100%", marginTop:"10px", marginBottom:"10px"}}></img>
                        </Col>
                        <Col>
                            <img src={this.props.img2} class="rounded" style={{height:"90%",width:"100%", marginTop:"10px", marginBottom:"10px"}}></img>
                        </Col>
                    </Row>
                </Link>
            </Container>
        );
    }
}

export default Projectpreview;