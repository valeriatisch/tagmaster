import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col} from 'react-bootstrap';

class Projectpreview extends Component{
    render(){
        return(
            <Container style={{backgroundColor:"#3D3D3D",color:"#efeb53", borderRadius:"10px", marginBottom:"5px",width:"98%",border:"2px solid #efeb53"}}>
                <Link to={`/${this.props.creator}/projects/${this.props.id}`} style={{ textDecoration: 'none'}}>
                    <Row>
                        <Col style={{border:"2px solid #efeb53",borderTop:"none",borderRight:"none",borderLeft:"none",textAlign:"center"}}>
                            <b style={{fontSize:"24px",color:"#efeb53"}}>{this.props.title}</b><br/>
                            <b style={{fontSize:"16px",color:"#efeb53"}}>by {this.props.creator}</b>
                        </Col>
                    </Row>
                    <Row style={{marginBottom:"5px"}}>
                        <Col style={{fontSize:"20px",textAlign:"center"}}>
                            <span class="badge badge-primary">{this.props.tag1}</span>
                            <span class="badge badge-success" style={{marginLeft:"5px"}}>{this.props.tag2}</span>
                            <span class="badge badge-danger" style={{marginLeft:"5px"}}>{this.props.tag3}</span>
                            <span class="badge badge-warning" style={{marginLeft:"5px"}}>{this.props.numberoftags < 4 ? "" : `+${this.props.numberoftags-3} more Tags`}</span>
                            <span class="badge badge-info" style={{marginLeft:"5px"}}>{this.props.numberofpictures} Pictures</span> 
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign:"center"}}>
                            {this.props.description}
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