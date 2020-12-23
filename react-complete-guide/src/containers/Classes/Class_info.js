import React, { useState, useEffect } from "react"
import AxInstance from '../../axios'
import StudentTable from '../../components/StudentTable/StudentTable'
import { Route, Switch, Link } from 'react-router-dom';
import classes from './Class.css'
import AddModal from '../../components/AddStudentModal/AddStudentModal'
const class_info = props => {
    const [data, setdata] = useState(null)
    const [all_student, setAll] = useState(null)
    const [adding,setAdding] = useState(false)
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
        AxInstance.post('/deletestudent_class', delID).then(
            (response) => {
                fetch_data()
            }
        )


    }
    const addButtonClicked =() =>{
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
        AxInstance.post('/classes/'+props.match.params.id+'/'+"add", {"sid":sid}).then(
            (response) => {
                fetch_data()
            }
        )
    }

    return (
        
        <React.Fragment>
            <AddModal show={adding} cancelUpdate={cancelStudentAdding}>
                <StudentTable studentdata={all_student} display="adding" addStudent={addStudent}  ></StudentTable>
            </AddModal>
            <button onClick={addButtonClicked}>AddStudent</button>
            <StudentTable display="class" studentdata={data}  deleteHandler={deleteHandler}></StudentTable>
        </React.Fragment>


    );
}
export default class_info