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
                <label>Nơi học tập</label>
                <input name="work_place" ref={register({ required: true })} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label>Địa chỉ</label>
                <input name="address" ref={register} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label>Số điện thoại Bố</label>
                <input name="phone_1" ref={register({ required: true, minLength: { value: 10, message: "Invalid" } })} type="number" className="form-control" />
            </div>
            <div className="form-group">
                <label>Số điện thoại Mẹ</label>
                <input name="phone_2" ref={register({ required: true, minLength: { value: 10, message: "Invalid" } })} type="number" className="form-control" />
                {errors.phone_2 && <p>{errors.phone_2.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
export default StudentForm