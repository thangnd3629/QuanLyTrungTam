import React from 'react'
import { useForm } from 'react-hook-form';
const StudentForm = (props) => {
    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const onSubmit = (data) => {
        props.dataCreateHandler(data)
        
    };
    return (
        <form style={{ width: "50%", margin: "20px" }} onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Họ tên</label>
                <input name="name" ref={register({ required: true })} type="text" className="form-control" aria-describedby="emailHelp" />
                <small id="emailHelp" className="form-text text-muted">Điền đầy đủ họ và tên có dấu</small>
            </div>
            <div className="form-group">
                <label>Trường</label>
                <input name="school" ref={register({ required: true })} type="text" className="form-control" aria-describedby="emailHelp" />
                
            </div>
            <div className="form-group">
                <label>Lớp</label>
                <input name="class" ref={register({ required: true })} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label>Địa chỉ</label>
                <input name="address" ref={register} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label>Số điện thoại </label>
                <input name="phone" ref={register({ required: true, minLength: { value: 10, message: "Invalid" } })} type="number" className="form-control" />
            </div>
            

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
export default StudentForm