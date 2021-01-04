import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import MUIDataTable from "mui-datatables";
import { useForm } from 'react-hook-form';

import classes from './FeeModal.css'
export default function FeeModal(props) {

   
    const [money, setMoney] = useState('0')
    const onMoneyChange = (e) => {
        var text = e.target.value
    
        setMoney(text)
        

    }


    return (
        <Modal show={props.show} onHide={props.cancelUpdate} dialogClassName={classes.my_modal} >
            
            <Modal.Header closeButton>
                <Modal.Title>Thanh toán học phí</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div>
                    <MUIDataTable
                        title={props.table_title[1] + "---" + props.table_title[2]}
                        data={props.pay_info.map(elm => { return Object.values(elm) })}
                        columns={['Lớp', "Giảng viên", "Học phí"]}
                        options={
                            {
                                selectableRows: "single",
                                selectableRowsHideCheckboxes: true,
                            }
                        }
                    />
                </div>
                <div>
                    <form id="my-form">
                        <div className="input-group mb-3">
                            <input type="text" name="amount" value={money} onChange={onMoneyChange} className="form-control" placeholder="Số tiền thanh toán" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">nghìn VND</span>
                                </div>
                        </div>
                        
                    </form>
                    
                </div>

            </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.cancelUpdate}>
                        Close
                    </Button>
                    <button className="btn btn-success" onClick={()=> props.finishUpdate(money)}>Submit</button>
            
                </Modal.Footer>
        </Modal>
    )
}

