import React, { useState,useEffect } from 'react'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AxInstance from '../../axios'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import "react-day-picker/lib/style.css";
import { Button } from 'react-bootstrap';
import styles from './ClassForm.css'
const ClassForm = (props) => {


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const useStyles = makeStyles((theme) => ({

        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }));
    const classes = useStyles();


    const names = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
        
    ];



    const [selectedWeekday, setSelectedWeekday] = React.useState([]);
    const handleChange = (event) => {
        
        
        setSelectedWeekday(event.target.value)
    };
    const [selectedTeacher, setTeacher] = useState(null);
    const [teacherList, setTeachersList] = useState([])
    const teachers_props = {
        options:teacherList, 
        getOptionLabel: (option) => option.name,
        onChange: (_, value) => {
            
            teacherList.forEach(elm => {
                if( JSON.stringify(value) === JSON.stringify(elm) )
                {
                    setTeacher(elm['id'])
                }
            })
            
        }
      };
    const [className, setClassName] = useState(null)
    const [price,setPrice] = useState(0)
    const classNameChange = (e) => {
        setClassName(e.target.value)
    }
    const priceChangeHandler = (e) => {
        setPrice(e.target.value)
    }
    const fetch_data = () => {
        AxInstance.get('/teachers').
        then(res => {
            const teacher_info = res.data['teachers']
            setTeachersList(teacher_info)

        })
    }
    const onSubmit =() => {
        AxInstance.post('/classes',{
            "name":className,
            "price":price,
            "teacher_id":selectedTeacher,
            "schedule":selectedWeekday.map(elm => {
                
                    if(elm === "Monday") return 2
                    if(elm === "Tuesday") return 3
                    if(elm === "Wednesday") return 4
                    if(elm === "Thursday") return 5
                    if(elm === "Friday") return 6
                    if(elm === "Saturday") return 7
                    if(elm === "Sunday") return 8
                
            })
        }).then(
            response => {
                console.log("OK")
            }
        )

    }
    
    useEffect(() => {
        fetch_data()
    }, [])
    
    return (
        <div className={styles.classform}>

            <TextField id="standard-basic" label="Class Name" onChange={classNameChange} required/>
            <Autocomplete
                
                style={{ width: "50vw"}}
                {...teachers_props}
                id="Teacher"
                autoSelect
                renderInput={(params) => <TextField {...params} label="Teacher" margin="normal" />}
            />
            <TextField id="standard-basic" label="Price" onChange={priceChangeHandler} required/>


            <FormControl className={classes.formControl} style={{ "width": "30vw"}} required>
                <InputLabel id="demo-mutiple-checkbox-label">Schedule</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={selectedWeekday}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedWeekday.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button style={{marginTop:"50px"}} className='btn btn success' onClick = {onSubmit}>Submit</Button>

        </div>
    )
}
export default ClassForm
