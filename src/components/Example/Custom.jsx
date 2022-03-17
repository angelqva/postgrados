/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';

import FormInputDate from '../Utils/FormInputDate';
import { useForm } from 'react-hook-form';

export default function Custom() {
    const year = 2014;
    const { handleSubmit, control, setValue} = useForm({
        defaultValues: {
            date: !!year?(new Date(year,0)):year
        }
    });
    const onSubmit = (data) => { 
        
        console.log('submit', data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{width:'200px'}}>
                <FormInputDate
                    name='date'
                    label='Date'
                    control={control}
                    rules={{
                        required: 'Este campo es requerido'
                    }}
                    setValue={setValue}
                    views={['year']}
                    formato='yyyy'
                    helperText='Introdusca el nombre'
                    
                />
            </div>
            
            <button>Submit</button>
        </form>
    );
}