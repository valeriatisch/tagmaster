import React, { Component } from "react";


class Upload extends Component {
    constructor(props){
        super(props);
        this.state = {
            Files: []
        }
    }

    onChange = (e) =>{
        this.setState({Files : e.target.files})
        console.log(this.state.Files)
    }

    render() {
        return (
            <div style={{backgroundColor:"#191919"}}>
                <style>{'.button1{width:150px; color:#efeb53; background-color:#282828; border: 1px solid #efeb53 } .button1:hover { background-color:#3F3F3F; color:#efeb53; border: 1px solid }'}</style>
                <form onSubmit={this.onFormSubmit}>
                    <div class="form-group files" style={{width:"300px"}}>
                        <input class="form-control" type="file" multiple onChange={this.onChange} style={{height:"200px",backgroundColor:"grey"}}/>
                    </div>
                    <button type="submit" class="btn button1" style={{width:"100px"}}>Upload</button>
                </form>
            </div>
        );
    }
}

export default Upload;