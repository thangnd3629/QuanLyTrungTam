import React, { useState, useEffect } from "react"
import AxInstance from '../../axios'
import StudentTable from '../../components/StudentTable/StudentTable'
import AddModal from '../../components/AddStudentModal/AddStudentModal'
import styles from './class_info.css'
const class_info = props => {
    const [data, setdata] = useState(null)
    const [activ_students, setAll] = useState(null)
    const [adding, setAdding] = useState(false)
    const fetch_data = () => {
        AxInstance.get('/classes/' + props.match.params.id).then(

            (response) => {

                setdata(response.data["students"])

            }
        )
    }
    useEffect(() => {
        fetch_data();
    }, []);


    const deleteHandler = (delID) => {
        delID = delID.map(elm => {
            console.log(elm)
            return {
                id: elm.id,

            }
        })
        AxInstance.delete('/enrol/' + props.match.params.id,
            { data: { delID: delID } }
        ).then(
            (response) => {
                fetch_data()
            }
        )
    }
    const addButtonClicked = () => {
        setAdding(!adding)
        AxInstance.get('/students/active').then(

            (response) => {

                setAll(response.data["students"])

            }
        )
    }
    const cancelStudentAdding = () => {

        setAdding(!adding)
    }
    const addStudent = (sid) => {
        AxInstance.post('/enrol/' + props.match.params.id, { "id": sid }).then(
            (response) => {
                fetch_data()
            }
        )
    }
    return (

        <React.Fragment>
            <AddModal show={adding} cancelUpdate={cancelStudentAdding}>
                <StudentTable studentdata={activ_students} display="adding" addStudent={addStudent}  ></StudentTable>
            </AddModal>
            <div class={styles['box-1']}>
  <div className={[styles['btn-one'],styles['btn']].join(' ')} onClick={addButtonClicked}>
    <span  >Thêm học sinh</span>
  </div>
</div>
            
            <StudentTable display="class" studentdata={data} deleteHandler={deleteHandler}></StudentTable>
        </React.Fragment>


    );
}
export default class_info