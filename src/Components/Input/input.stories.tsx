import { Meta, StoryObj } from '@storybook/react';
import Input, { Props } from './index';

export default {
    title: 'Components/Inputs',
    component: Input,
    args: {
        onChange: (value:string) => console.log(value), onSubmit: () => null, value: ''
    },
} as Meta<Props>;

export const InputWithoutValue: StoryObj<Props> = {

};

export const InputSearchWithValue: StoryObj<Props> = {
    args: {
        value: 'jhony'
    },
};