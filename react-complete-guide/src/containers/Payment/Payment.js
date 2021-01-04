import React, { Fragment, useState, useEffect } from "react";
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import AxInstance from '../../axios'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import StudentTable from '../../components/StudentTable/StudentTable'
import FeeModal from '../../components/FeeModal/FeeModal'

function Payment() {
    // date picker
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [pay_info, setPayInfo] = useState(null)
    const [fee_processing, setProcessingState] = useState(false)
    const [pay_component_info, setPayComponentInfo] = useState(null)
    const [student_info, setStudentInfo] = useState(null)
    const dateChangeHandler = (date) => {
        setSelectedDate(date)
    }
    // fetch payment data from server
    const fetch_data = () => {
        const month = selectedDate.getMonth() + 1
        const year = selectedDate.getFullYear()
        AxInstance.post('/payment',{"month":month,"year":year}).then(
            response => {
                AxInstance.get(`/payment/${month}/${year}`).then(
                    (response) => {
                        setPayInfo(response.data['payment_info'])
                    }
                )
            }
        )
    }
    useEffect(() => {
        fetch_data()
    }, [selectedDate])
   
    const tutionFeeHandler = (s_info) => {
        
        AxInstance.get(`/payment/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}/${s_info[0]}`).
            then(response => {
                setPayComponentInfo(response.data['payment_info'])
                setProcessingState(true)
                setStudentInfo(s_info)
            })

    }
    const cancelUpdate = () => {
        setProcessingState(false)
    }
    const finishUpdate = (amount) => {
        const sid = student_info[0]
        const month = selectedDate.getMonth() + 1
        const year = selectedDate.getFullYear()
        AxInstance.put(`/payment/${month}/${year}/${sid}`,{"paid":amount}).then(response => {
            setProcessingState(false)
            fetch_data()
        })
    }
    return (
        <React.Fragment>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    variant="inline"
                    openTo="year"
                    views={["year", "month"]}
                    label="Tháng/Năm"
                    value={selectedDate}
                    onChange={dateChangeHandler}
                />
            </MuiPickersUtilsProvider>
            <StudentTable

                display={"payment"}
                studentdata={pay_info}
                onClick={tutionFeeHandler}
            >
            </StudentTable>
            {
                fee_processing === true && student_info !== null ? 
                <FeeModal
                table_title = {student_info}
                show={fee_processing}
                cancelUpdate={cancelUpdate}
                finishUpdate={finishUpdate}
                pay_info={pay_component_info}
            />:null
            }
        </React.Fragment>
    );
}

export default Payment;
