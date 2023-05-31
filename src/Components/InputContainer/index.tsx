import React, { useState } from 'react';
import { inputContainerStyles } from './style';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Input from '../Input';

export interface Props {
    handleSubmit: (value: string) => void;
}

export default function InputContainer({ handleSubmit }: Props) {
    const { container, buttonStyle, wrapper } = inputContainerStyles();

    const [valueInput, setValueInput] = useState<string>('');

    const handleChange = (value: string): void => {
        setValueInput(value);
    };

    const handleSubmitInput = (): void => {
        handleSubmit(valueInput);
        setValueInput('');
    };

    return (
        <div className={container}>
            <div className={wrapper}>
                <Input onChange={handleChange} value={valueInput} />
                <Button className={buttonStyle} variant='contained' color='primary' onClick={() => handleSubmitInput()}>
                    <AddIcon />
                </Button>
            </div>
        </div>
    );
};
