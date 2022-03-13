import * as React from 'react';
import { TextField} from '@mui/material';
import { FormControl, FormHelperText} from '@mui/material';
import { Controller} from "react-hook-form";

export default function FormInputText({ name, value='', control, setValue, handleChange, rules, label, type = 'text', helperText, responseErrors }){
    
    const [inputValue, setInputValue] = React.useState(value);
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
                        value={inputValue}
                        type={type}
                        onChange={handleInputChange}
                    />
                    {error
                        ? <FormHelperText>error.message</FormHelperText>
                        : <FormHelperText>{helperText}{ responseErrors && responseErrors.message } </FormHelperText>
                    }
                </FormControl>
            )}
        />
    );
};