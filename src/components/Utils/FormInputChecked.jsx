import * as React from 'react';
import { FormControl,FormControlLabel,Switch} from '@mui/material';
import { Controller } from "react-hook-form";

export default function FormInputChecked({ name, control, setValue, label }) {
    
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: {value},
            }) => (
                <FormControl className='form-control'>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={value}
                                onChange={(event) => {
                                    setValue(name, event.target.checked)
                                }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                        label={label}
                    />
                </FormControl>
            )}
        />
    );
};