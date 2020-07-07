import React, { Component } from "react";
import LabelImage from "../components/labelImage";

/*TODO:
  Style des Modals an die Seite anpassen
*/
class Label extends Component {
    render(){
    return(
      <LabelImage imgsrc="https://source.unsplash.com/random" imageLabels={["cat", "dog", "bird"]}/>
    );
  }    
}
export default Label;