import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";

const StudentTable = (props) => {
    if (!props.studentdata) return null
    var col = ["ID", "Họ tên", "Trường", "Lớp", "Địa chỉ", "Số điện thoại", "Học"]
    var received_data = [...props.studentdata]
    var row = received_data.map(elm => {
        var x = Object.values(elm)
        var activeStattus = col.findIndex(elm => {
            return elm==='Học'
        })
        if(x[activeStattus])
        {
            x[activeStattus] = "Đang học"
        }
        else{
            x[activeStattus] = "Nghỉ học"
        }

        return x
    })
    

    const options = {
        onRowClick: (e) => {

            props.editHandler({
                id: e[0],
                name: e[1],
                school: e[2],
                class: e[3],
                address: e[4],
                phone: e[5],
                active: e[6] === "Đang học" ? true : false
            });

        },
        onRowsDelete: (data) => {
            var deleteIdx = Object.keys(data['lookup'])
            const deleteID = deleteIdx.map(elm => {
                return received_data[parseInt(elm)]
            })
            props.deleteHandler(deleteID)
            
        }
    };
    return (
        <React.Fragment>

            <MUIDataTable
                title={"Students"}
                data={row}
                columns={col}
                options={options}
            />
        </React.Fragment>

    );
}
export default StudentTable;