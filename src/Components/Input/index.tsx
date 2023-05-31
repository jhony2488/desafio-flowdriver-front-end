import React from 'react';
import {
    FormControl,
    TextField,
} from '@material-ui/core';
import { inputStyles } from './style';

export interface Props {
    onChange: (value: string) => void;
    value: string;
    id?: string;
}

export default function Input({ onChange, value, ...rest }: Props) {
    const { search, input } = inputStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value);
    };

    return (
        <FormControl className={search}>
            <TextField
                size="small"
                className={input}
                variant="outlined"
                color="secondary"
                onChange={handleChange}
                value={value}
                {...rest}
            />
        </FormControl>
    );
};
