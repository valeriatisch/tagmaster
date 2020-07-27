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
                    {"body { background-color: #191919; color: #CBCBCB} h1{color:#efeb53}"}
                </style>
                <h1 class="text-center">All Projects</h1>
                <Projectpreview title="Road traffic"  tags={["car","bus","pedestrian","","","",""]}
                 numberofpictures="38" img1={picture1} img2={picture2}/>
                <Projectpreview title="Dog races" tags={["beagle","kooikerhondje","poodle","","","","","","","",""]}
                 numberofpictures="45" img1={picture3} img2={picture4}/>
                <Projectpreview title="Dolphins" tags={["dolphin"]}
                 numberofpictures="282" img1={picture5} img2={picture6}/>
                <Projectpreview title="Wild animals" tags={["elephant","snake","lion","dsd","","","","","","","",""]}
                 numberofpictures="53" img1={picture7} img2={picture8}/>
            </div>
        );
    }
}

export default Projects;
