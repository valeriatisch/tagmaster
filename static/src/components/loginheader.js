import React, {Component} from 'react'


class Loginheader extends Component {
    render(){
        return (
        <div>
            <h1 style={{fontSize:"40px"}}>{this.props.title}</h1>
        </div>
        )
    }
}

export default Loginheader;
