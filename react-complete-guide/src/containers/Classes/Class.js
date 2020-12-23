import React, { useState } from "react"
import { Route, Switch ,Link} from 'react-router-dom';
import classes from './Class.css'
const Class = props => {
    
    return (
        <div >
            <div className={['card text-center', classes.card].join(" ")}>
                <div className={classes.overflow}>
                    <img src={props.img} className={["card-img-top",classes.bigger_img].join(" ")}/>
                </div>
                <div className="card">
                    <div className="card-body text dark">
                    <h5 className="card-title">{props.class_name}</h5>
                        <Link to={'/classes/'+props.class_id}>
                            <p>Hello</p>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
        
    );
}
export default Class