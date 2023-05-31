import { Meta, StoryObj } from '@storybook/react';
import ServicesContentList, { Props } from './index';
import {mocked} from '../../utils/mockedValues';

export default {
    title: 'Components/Container/Content/List',
    component: ServicesContentList,
    args: {
       items:[]
    },
} as Meta<Props>;

export const ServicesContentListWithoutServices: StoryObj<Props> = {

};

export const ServicesContentListWithServices: StoryObj<Props> = {
    args: {
        items:mocked
    },
};