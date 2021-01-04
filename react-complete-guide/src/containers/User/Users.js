import React, { useState,useEffect } from "react"
import AxInstance from '../../axios'
import StudentTable from '../../components/StudentTable/StudentTable'
import EditModal from '../../components/EditModal/EditModal'

const user = (props) => {
    // State
    const [data, setdata] = useState(null)
    const [edit_info, setEditInfo] = useState(null)
    

    //fetch data from server
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
    
    // controller
    const dataUpdateHandler = (modified_data) => {
        
        setEditInfo(modified_data)
    }
    const setActive = (active) => {
        var modified_data = {...edit_info}
        modified_data.active = active
        setEditInfo(modified_data)
    }
    const editHandler = (info) => {
        
        setEditInfo(info)
    }
    const cancelUpdateHandler = ()=> {
        setEditInfo(null)
    }
    const finishUpdateHandler = () => {
        var mod_data = { ...edit_info }
        setEditInfo(null)
        AxInstance.put('/students', mod_data).then(
            (response) => {
                fetch_data()
            }
        )
    }
    const deleteHandler = (delID)=> {
        delID = delID.map(elm => {
            console.log(elm)
            return {
                id:elm.id,
                active:elm.active
            }
        })
        
        AxInstance.delete('/students', {data:{"delID":delID}}).then(
            (response) => {
                fetch_data()
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