import * as React from 'react';
import { TextField} from '@mui/material';
import { FormControl,Autocomplete, FormHelperText} from '@mui/material';
import { Controller} from "react-hook-form";

export default function FormAutocomplete({ name, control, rules, setValue, label, options, helperText, solveError, ...props }) {
    
    const [inputValue, setInputValue] = React.useState('');
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                field: { value },
                fieldState: { error },
            }) => (
                <FormControl error={!!error} className='form-control'>
                    <Autocomplete
                        sx={{width:'100%'}}
                        options={options}
                        value={value===[]?null:value}
                        onChange={(event, newValue) => {
                            setValue(name, newValue, {shouldValidate:true});
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                            if (!!error) {
                                if (!!solveError) { solveError(name);}
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                                error={!!error}
                            />
                        )}
                        {...props}
                    />
                    {error
                        ? <FormHelperText>{error.message}</FormHelperText>
                        : <FormHelperText>{helperText}</FormHelperText>
                    }
                </FormControl>
            )}
        />
    );
};
/*EXAMPLE OF USE
<FormAutocomplete>
    name={}
    control={}
    rules={}
    setValue={}
    label=''
    helperText=''
    solveError={}
    options={array}
    autoHighlight
    getOptionLabel={(option) => option.nombre}
    renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {option.nombre} {option.apellidos}
        </Box>
    )}
</FormAutocomplete>
<FormAutocomplete>
    name={}
    control={}
    rules={}
    setValue={}
    label=''
    helperText=''
    solveError={}
    options={array}
    disableCloseOnSelect
    multiple
    getOptionLabel={(option) => option.nombre}
    renderOption={(props, option, { selected }) => (
        <li {...props}>
        <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
        />
        {option.nombre} {option.apellidos}
        </li>
    )}
</FormAutocomplete>
*/