import React, { useState } from "react"
import img1 from '../../asset/eclass.png'

const Class = props => {
    return (
        <div >
            <div className='card text-center'>
                <div className='overflow'>
                    <img src={img1} className="card-img-top"/>
                </div>
                <div class="card">
                    <div class="card-body text dark">
                        <p>Hello</p>
                        <a href="#" className="btn btn-outline-success">Test</a>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
export default Class