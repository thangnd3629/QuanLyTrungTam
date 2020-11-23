import React, { useState } from "react"
import StudentCreateForm from '../../components/StudentCreateForm/StudentForm'
import AxInstance from '../../axios'
const NewUser = ()=> {
    
    const dataCreateHandler = (info)=> {
        
        AxInstance.post('/students',info).then(
            (response) => {
            }
        )
        
    }
    

    return(
        <StudentCreateForm dataCreateHandler={dataCreateHandler}></StudentCreateForm>
    )
}
export default NewUser