import React, { Component } from "react";
import { Container, Row, Col, Badge} from 'react-bootstrap';


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            Files: []
        }
    }

    printTags() {
        let ausgabe = [];
        let tags = this.props.tags;
        let colors = ["#0247FE","green","#FE2712","#FB9902","#20B2AA","#FF69B4","darkviolet"];
        
        for (let i=0; i < tags.length; i++){
        let badge = <Badge variant="primary" style={{backgroundColor:colors[i%colors.length],marginRight:"5px"}}>{tags[i]}</Badge>;
            ausgabe.push(badge);
        }
        return ausgabe;
    }
    
    onChange = (e) =>{
        this.setState({Files : e.target.files})
    }

    render() {
        return (
            <div style={{backgroundColor:"#191919"}}>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{marginTop:"10px","textAlign":"center","fontSize":"50px"}}>{this.props.title}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{fontSize:"24px","textAlign":"center"}}>
                            {this.printTags()}
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginTop:"15px","textAlign":"center"}}>
                            <div style={{backgroundColor:"#191919"}}>
                                <style>{'.button1{width:150px; color:#efeb53; background-color:#282828; border: 1px solid #efeb53 } .button1:hover { background-color:#3F3F3F; color:#efeb53; border: 1px solid }'}</style>
                                <form onSubmit={this.onFormSubmit} style={{margin:"0 auto",width:"300px"}}>
                                    <div class="form-group files" style={{width:"300px"}}>
                                        <input class="form-control" type="file" accept="image/png, image/jpeg" multiple onChange={this.onChange} style={{height:"200px",backgroundColor:"grey"}}/>
                                    </div>
                                    <button type="submit" class="btn button1" style={{width:"100px"}}>Upload</button>
                                </form>
                            </div>
                        </Col>
                    </Row>    
                </Container>
            </div>
        );
     }
}

export default Register;