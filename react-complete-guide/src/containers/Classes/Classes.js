import React, { Component } from "react"
import Class from './Class'
import img1 from '../../asset/eclass.png'
import AxInstance from '../../axios'
import { Route, Switch ,Link} from 'react-router-dom';
class Classes extends Component {
    state = {
        classes_info:null

    }
    componentDidMount()
    {
        AxInstance.get('/classes').then(
            
            (response) => {
                
                this.setState({classes_info:response.data['classes']})


            }
        )
    }

    
    render() {
        if(this.state.classes_info!==null){
            var clasCard = this.state.classes_info.map((elm) => {
                
                return(
                    <div className="col-md-4" key={elm.id}>
                        <Class img={img1} class_name={elm.name} class_id={elm.id}></Class>
                    </div>
                );
            })
        }
        return (
            <div className="container-fluid d-flex fustify-content-center">
                <div className="row">
                    {clasCard}
                </div>
                
            </div>

        )
    }
}
export default Classes