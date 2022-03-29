import React from 'react'
import { Field, useField, useFormikContext } from 'formik'

//Mui components
import { Autocomplete, TextField as MuiTextField } from '@mui/material'


export default function MultipleSelect({ label, options, ...props }) {
    const [field, meta] = useField(props);
    const formik = useFormikContext();

    return (
        <Autocomplete
            name={field.name}
            value={field.value.map(item => {
                return { label: item, value: item }
            })}
            multiple
            limitTags={3}
            options={options}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(event, value, reason) => {
                if (reason === 'clear') {
                    formik.setFieldValue(field.name, [])
                } else {
                    formik.setFieldValue(field.name, value.map(item => { return item.value }))
                }
            }}
            renderInput={(params) => (
                <Field
                    as={MuiTextField}
                    error = {(meta.error? true:false) && meta.touched}
                    helperText={(meta.error? true:false) && meta.touched? meta.error : ''}
                    {...params}
                    label={label}
                    fullWidth
                    margin='normal'
                />
            )}
        />
    )
}