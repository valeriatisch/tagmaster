import React, { Component } from "react";
import Projectpreview from "../components/projectpreview";
import picture1 from "../ressources/crosswalkwithcar.jpg"
import picture2 from "../ressources/citycrosswalk.jpg"
import picture3 from "../ressources/kooiker.jpeg"
import picture4 from "../ressources/beagle.jpg"
import picture5 from "../ressources/dolphin1.png"
import picture6 from "../ressources/dolphin2.png"
import picture7 from "../ressources/giraffe.jpg"
import picture8 from "../ressources/lion.jpg"

class Projects extends Component{
    render(){
        return(
            <div>
                <style>
                    {"body { background-color: #191919; color: #CBCBCB; min-height: 100%} h1{color:#efeb53}"}
                </style>
                <h1 class="text-center">All Projects</h1>
                <Projectpreview title="Road traffic" creator="kevin" tag1="car" tag2="bus" tag3="pedestrian" id="1"
                 numberoftags="7" numberofpictures="38" img1={picture1} img2={picture2} 
                 description="In this Project you will be labelling everything that can either drive or walk on the road."/>
                <Projectpreview title="Dog races" creator="bert" tag1="beagle" tag2="kooikerhondje" tag3="poodle" id="2"
                 numberoftags="31" numberofpictures="45" img1={picture3} img2={picture4} 
                 description="Label up to 31 different races of dogs."/>
                <Projectpreview title="Dolphins" creator="max" tag1="dolphin" tag2="" tag3="" id="3"
                 numberoftags="1" numberofpictures="282" img1={picture5} img2={picture6} 
                 description=""/>
                <Projectpreview title="Wild animals" creator="kurt" tag1="elephant" tag2="snake" tag3="lion" id="4"
                 numberoftags="24" numberofpictures="53" img1={picture7} img2={picture8} 
                 description="Browse through the wildlife to label many exotic animals."/>
            </div>
        );
    }
}

export default Projects;
