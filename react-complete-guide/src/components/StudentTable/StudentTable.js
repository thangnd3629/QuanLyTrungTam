import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";

const StudentTable = (props) => {
    if (!props.studentdata) return null
    var col = ["ID","Họ tên", "Nơi học tập", "Địa chỉ", "SDT bố","SDT mẹ" ]
    var received_data = [...props.studentdata]
    var row = received_data.map(elm => {
        var x =  Object.values(elm)
        
        return x
    })
    const options = {
        onRowClick: (e) => { 

            props.editHandler({
                id:e[0],
                name:e[1],
                work_place:e[2],
                address:e[3],
                phone_1:e[4],
                phone_2:e[5]
            });
            
        },
        onRowsDelete: (e) => {
            console.log(e)
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