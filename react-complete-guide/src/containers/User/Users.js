import React, { useState,useEffect } from "react"
import AxInstance from '../../axios'
import StudentTable from '../../components/StudentTable/StudentTable'
import EditModal from '../../components/EditModal/EditModal'

const user = (props) => {
    const [data, setdata] = useState(null)
    
    const [edit_info, setEditInfo] = useState(null)
    
    const fetch_data = () => {
        AxInstance.get('/students').then(
            
            (response) => {
                
                setdata(response.data["students"])

            }
        )
    }
    useEffect(() => {
        fetch_data();
      }, []);

    
    const dataUpdateHandler = (modified_data) => {
        
        setEditInfo(modified_data)
    }
    const setActive = (active) => {
        var modified_data = {...edit_info}
        modified_data.active = active
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
    const deleteHandler = (delID)=> {
        delID = delID.map(elm => {
            console.log(elm)
            return {
                id:elm.id,
                active:elm.active
            }
        })
        AxInstance.post('/deletestudent', delID).then(
            (response) => {
                setdata(response.data["students"])
            }
        )
        
        
    }

    return (
        <React.Fragment>
            
            <EditModal show={edit_info === null ? false : true} cancelUpdate={cancelUpdateHandler} finishUpdate={finishUpdateHandler} dataUpdateHandler={dataUpdateHandler}
                info={edit_info} onTickChange={setActive}
            ></EditModal>
            <StudentTable display="student" studentdata={data} editHandler={editHandler}  deleteHandler={deleteHandler} ></StudentTable>
        </React.Fragment>
    );
}
export default user;