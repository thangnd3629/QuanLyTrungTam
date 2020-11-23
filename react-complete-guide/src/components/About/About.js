import React from "react"
import { Button } from "react-bootstrap";
import AxInstance from "../../axios"
const about = () =>{
    const clicked = () => {
        
        AxInstance.get('/').then(
            (response)=>{
                console.log(response)
            }
        )
    }
    return(
        <React.Fragment>
            <div>About</div>
            <Button onClick={clicked}></Button>
        </React.Fragment>
        
    );
}
export default about;