import React, { useState } from "react"
import AxInstance from '../../axios'
import StudentTable from '../../components/StudentTable/StudentTable'
import EditModal from '../../components/EditModal/EditModal'

const user = (props) => {
    const [data, setdata] = useState(null)
    
    const [edit_info, setEditInfo] = useState(null)
    
    const clicked = () => {
        AxInstance.get('/students').then(
            (response) => {
                setdata(response.data["students"])

            }
        )
    }
    
    const dataUpdateHandler = (e, field) => {
        var input_text = e.target.value;
        var modified_data = { ...edit_info }
        modified_data[field] = input_text
        setEditInfo(modified_data)
    }
    const finishUpdateHandler = () => {
        var mod_data = { ...edit_info }
        setEditInfo(null)
        AxInstance.post('/updatestudent', mod_data).then(
            (response) => {
                setdata(response.data["students"])
            }
        )
    }
    const editHandler = (info) => {
        
        setEditInfo(info)
    }
    const cancelUpdateHandler = ()=> {
        setEditInfo(null)
    }
    

    return (
        <React.Fragment>
            
            <EditModal show={edit_info === null ? false : true} cancelUpdate={cancelUpdateHandler} finishUpdate={finishUpdateHandler} dataUpdateHandler={dataUpdateHandler}
                info={edit_info}
            ></EditModal>
            <button className='btn btn-danger' onClick={clicked}>Trigger</button>
            <StudentTable studentdata={data} editHandler={editHandler} ></StudentTable>
        </React.Fragment>
    );
}
export default user;