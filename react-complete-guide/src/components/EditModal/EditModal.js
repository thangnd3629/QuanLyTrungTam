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
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Họ và tên"
                                value={props.info['name']}
                                onChange={(e) => props.dataUpdateHandler(e, "name")} />
                        </div>
                        <div className="form-group">
                            <label>Nơi học tập</label>
                            <input type="text"
                                onChange={(e) => props.dataUpdateHandler(e, "work_place")}
                                value={props.info['work_place']} className="form-control" aria-describedby="emailHelp" placeholder="Nơi học tập" />
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input

                                onChange={(e) => props.dataUpdateHandler(e, "address")}
                                type="text" value={props.info['address']} className="form-control" aria-describedby="emailHelp" placeholder="Địa chỉ" />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại của Bố</label>
                            <input onChange={(e) => props.dataUpdateHandler(e, "phone_1")} type="text" value={props.info['phone_1']} className="form-control" aria-describedby="emailHelp" placeholder="Số điện thoại của Bố" />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại của Mẹ</label>
                            <input onChange={(e) => props.dataUpdateHandler(e, "phone_2")} type="text" value={props.info['phone_2']} className="form-control" aria-describedby="emailHelp" placeholder="Số điện thoại của Mẹ" />
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