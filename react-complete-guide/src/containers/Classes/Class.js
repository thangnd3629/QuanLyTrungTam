import React, { useState } from "react"
import { Route, Switch ,Link} from 'react-router-dom';
import classes from './Class.css'
const Class = props => {
    if(props.newClass)
    {
        return (
            <div >
                <div className={['card text-center', classes.card].join(" ")}>
                    <div className={classes.overflow}>
                        <img src={props.img} className={["card-img-top",classes.bigger_img].join(" ")}/>
                    </div>
                    <div className="card">
                        <div className="card-body text dark">
                        
                            <Link to={'/newclass'}>
                                <h5 className="card-title">Tạo lớp mới</h5>
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
    return (
        <div >
            <div className={['card text-center', classes.card].join(" ")}>
                <div className={classes.overflow}>
                    <img src={props.img} className={["card-img-top",classes.bigger_img].join(" ")}/>
                </div>
                <div className="card">
                    <div className="card-body text dark">
                    
                        <Link to={'/classes/'+props.class_id}>
                            <h5 className="card-title">{props.class_name}</h5>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
        
    );
}
export default Class