import React, { Component, useState } from "react"
import Class from './Class'
class Classes extends Component{
    state = {
        
    }
    render()
    {
        return(
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-4">
                        <Class></Class>
                    </div>
                    <div className="col-md-4">
                        <Class></Class>
                    </div>
                    <div className="col-md-4">
                        <Class></Class>
                    </div>
                </div>
            </div>
        )
    }
}
export default Classes