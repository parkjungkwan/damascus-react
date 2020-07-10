import React, {Component} from "react";

interface HelloProps {
    name:string
}
class HelloName extends Component<HelloProps>{
    public state = {name: ""}

}


export default HelloName