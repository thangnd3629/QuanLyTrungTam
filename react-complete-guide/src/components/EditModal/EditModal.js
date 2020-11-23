import React, { useState } from "react"
import { Modal, Button } from 'react-bootstrap';
function EditModal(props) {

    if (!props.info) return null
    
    return (

        <React.Fragment>
            <Modal show={props.show} onHide={props.cancelUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin học sinh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Họ tên</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp" 
                                value={props.info['name']}
                                onChange={(e) => props.dataUpdateHandler(e, "name")} />
                        </div>
                        <div className="form-group">
                            <label>Trường</label>
                            <input type="text"
                                onChange={(e) => props.dataUpdateHandler(e, "school")}
                                value={props.info['school']} className="form-control" aria-describedby="emailHelp"  />
                        </div>
                        <div className="form-group">
                            <label>Trường</label>
                            <input type="text"
                                onChange={(e) => props.dataUpdateHandler(e, "class")}
                                value={props.info['class']} className="form-control" aria-describedby="emailHelp"/>
                        </div>

                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input

                                onChange={(e) => props.dataUpdateHandler(e, "address")}
                                type="text" value={props.info['address']} className="form-control" aria-describedby="emailHelp"  />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input onChange={(e) => props.dataUpdateHandler(e, "phone")} type="text" value={props.info['phone']} className="form-control" aria-describedby="emailHelp"  />
                        </div>
                        <div className="form-group">
                            <label>Đang học</label> 
                            <input checked={props.info.active} onChange={(e) => props.onTickChange(e.target.checked)} type="checkbox" value={props.info['active']} className="form-control" aria-describedby="emailHelp" placeholder="Số điện thoại của Mẹ" />
                        </div>
                        
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.cancelUpdate}>
                        Close
            </Button>
                    <Button variant="primary" onClick={props.finishUpdate}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}
export default EditModal