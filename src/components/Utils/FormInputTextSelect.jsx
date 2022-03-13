import * as React from 'react';
import { TextField} from '@mui/material';
import { FormControl, FormHelperText, MenuItem} from '@mui/material';
import { Controller} from "react-hook-form";

export default function FormInputTextSelect({ name,control, handleChange, setValue, rules, label, options, helperText, responseErrors }){

    const [inputValue, setInputValue] = React.useState(options[0]);
    React.useEffect(() => {
        setValue(inputValue)
    }, [inputValue,setValue])
    const handleInputChange = (event)=>{
        setInputValue(event.target.value);
        if(!!handleChange){handleChange(event)}
    }
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                fieldState: { error },
            }) => (
                <FormControl className='form-control' error={!!error||!!responseErrors}>
                    <TextField
                        label={label}
                        select
                        value={inputValue}
                        onChange={handleInputChange}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    {error
                        ? <FormHelperText>error.message</FormHelperText>
                        : <FormHelperText>{helperText}{ responseErrors && responseErrors.message }</FormHelperText>
                    }
                </FormControl>
            )}
        />
    );
};
