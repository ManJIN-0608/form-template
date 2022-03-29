import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

//Mui components
import { RadioGroup as MuiRadioGroup, Button, Box, Typography, TextField as MuiTextField, Grid, Dialog, DialogTitle, DialogContent } from '@mui/material'


import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
//customized conponents
import MyTextField from './components/TextField'
import SingleSelect from './components/SingleSelect'
import RadioGroup from './components/RadioGroup'
import DatePicker from './components/DatePicker'
import MultipleSelect from './components/MultipleSelect'

const taskTypeOptions = [
    { label: 'task_type1', value: 'task_type1' },
    { label: 'task_type2', value: 'task_type2' },
    { label: 'task_type3', value: 'task_type3' }
]

// const genderOptions = [
//     { value: 'male', label: 'Male' },
//     { value: 'female', label: 'Female' },
//     { value: 'other', label: 'Other' }
// ]


const assigneeOptions = [
    { label: 'Alice', value: 'Alice' },
    { label: 'Boyang', value: 'Boyang' },
    { label: 'Charles', value: 'Charles' },
    { label: 'Daniel', value: 'Daniel' },
    { label: 'Evan', value: 'Evan' },
    { label: 'Finley', value: 'Finley' },
    { label: 'George', value: 'George' },
]

export default function Form2() {
    const [openPopup, setOpenPopup] = useState(false);

    return (
        <Formik
            //intial values, will appear on the form when first launched
            initialValues={{
                taskName: '',
                taskType: '',
                assignee: [],
                due_date: new Date(),
                expected_days: '0',
                expected_hours: '6',
                comment: ''
            }}
            validationSchema={
                //configure the validation criteria in the Yup object below 
                Yup.object({
                    taskName: Yup.string().required('Task name required').max(20, 'Username must be 20 characters or less'),
                    taskType: Yup.string().required('Task type required'),
                    expected_days: Yup.number().required('Expected days requied').min(0, 'days invalid'),
                    expected_hours: Yup.number().required('Expected hours requied').min(0, 'days invalid').max(24, 'days invalid'),
                    assignee: Yup.array().min(1, "sssss"),
                })
            }
            onSubmit={(values, actions) => {
                alert(`Data Submited: \n${JSON.stringify(values)}`)
                actions.resetForm();
            }}
        >
            {formik => (
                <>
                    {/* button for opening the form */}
                    <Button variant='contained' color='primary' onClick={() => { setOpenPopup((prev) => !prev) }}>Add New Task</Button>
                    <Dialog open={openPopup}>

                        <DialogTitle sx={{}}>
                            <Typography variant='h5' component='span'>
                                New Task
                            </Typography>

                            {/* button for closing the form */}
                            <Button variant='contained' color='error' size='small' onClick={() => { setOpenPopup((prev) => !prev) }} style={{ float: 'right' }}>X</Button>
                        </DialogTitle>

                        <DialogContent dividers={true}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    {/* plain Text input 
                                        to use you need: 
                                        1. declare name and initialvalue in initialValues
                                        2. configure the validation schema in Yup.object within validationSchema array
                                        3. give name and label attibute to the component, name must be same as ones you use in initialValues and validationSchema
                                        4. must used with formik liberary
                                    */}
                                    <MyTextField
                                        name='taskName'
                                        label='Task Name*'
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    {/* Select - for select single option
                                        to use you need: 
                                        1. declare name and initialvalue in initialValues
                                        2. configure the validation schema in Yup.object within validationSchema
                                        3. create the options array, e.g. [{ label: 'l1', value: 'v1' }, { label: 'l2', value: 'v2' }...],
                                        the first and second attribute of every element in this array must be 'label' and 'value'
                                        4. pass name, label, options array as props to the component, name must be same as ones you use in initialValues and validationSchema
                                        5. must used with formik liberary
                                    */}
                                    <SingleSelect
                                        name='taskType'
                                        label='Task Type'
                                        options={taskTypeOptions}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    {/* Select - for select single option
                                        to use you need: 
                                        1. declare name and initialvalue in initialValues
                                        2. configure the validation schema in Yup.object within validationSchema
                                        3. create the options array, e.g. [{ label: 'l1', value: 'v1' }, { label: 'l2', value: 'v2' }...],
                                        the first and second attribute of every element in this array must be 'label' and 'value'
                                        4. pass name, label, options array as props to the component, name must be same as ones you use in initialValues and validationSchema
                                        5. must used with formik liberary
                                    */}

                                    <MyTextField
                                        label="Expected days"
                                        name='expected_days'
                                        id="outlined-number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    {/* Select - for select single option
                                        to use you need: 
                                        1. declare name and initialvalue in initialValues
                                        2. configure the validation schema in Yup.object within validationSchema
                                        3. create the options array, e.g. [{ label: 'l1', value: 'v1' }, { label: 'l2', value: 'v2' }...],
                                        the first and second attribute of every element in this array must be 'label' and 'value'
                                        4. pass name, label, options array as props to the component, name must be same as ones you use in initialValues and validationSchema
                                        5. must used with formik liberary
                                    */}
                                    <MyTextField
                                        name='expected_hours'
                                        label='Expected hours'
                                        id="outlined-number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    {/* datepicker 
                                        to use you need: 
                                        1. declare name and initialvalue in initialValues
                                        2. configure the validation schema in Yup.object within validationSchema
                                        3. pass name, label, as props to the component, name must be same as ones you use in initialValues and validationSchema
                                        4. must used with formik liberary
                                    */}
                                    <DatePicker
                                        name='due_date'
                                        label='Due Date'
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    {/* selector - for select multiple options 
                                        to use you need: 
                                        1. declare name and initialvalue in initialValues
                                        2. configure the validation schema in Yup.object within validationSchema
                                        3. create the options array, e.g. [{ label: 'l1', value: 'v1' }, { label: 'l2', value: 'v2' }...],
                                        the first and second attribute of every element in this array must be 'label' and 'value'
                                        4. pass name, label, options array as props to the component, name must be same as ones you use in initialValues and validationSchema
                                        5. must used with formik liberary
                                    */}
                                    <MultipleSelect
                                        name='assignee'
                                        label='Assignee'
                                        options={assigneeOptions}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <MyTextField
                                        name='comment'
                                        label='Comment'
                                    />
                                </Grid>
                            </Grid>



                            <Box>
                                {/* submit button */}
                                <Button
                                    type='submit'
                                    variant='contained'
                                    size='small'
                                    color='primary'
                                    onClick={formik.handleSubmit}>
                                    SUBMIT
                                </Button>

                                {/* reset button */}
                                <Button
                                    variant='contained'
                                    size='small'
                                    color='error'
                                    onClick={formik.handleReset}
                                    style={{ float: 'right' }}>
                                    RESET
                                </Button>
                            </Box>
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </Formik>
    )
}
