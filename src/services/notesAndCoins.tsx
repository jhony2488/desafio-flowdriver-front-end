import { AxiosResponse } from 'axios';
import { api } from './api';
import { PropsCoins } from '../interfaces/coins';

export const getCoins = (id?: number): Promise<AxiosResponse> => {
    const filter = `?id=${id}`;

    if (id) {
        return api.get(`/notesAndCoins${filter}`, {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
            },
        });
    }
    return api.get('/notesAndCoins', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
    });
};

export const setMoney = (value:string,amount:number): Promise<AxiosResponse> => {
    return api.post('/notesAndCoins', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            value, 
            amount
        }
    });
};

export const updateMoney = (id: number | string, value:string,amount:number): Promise<AxiosResponse> => {
    return api.put(`/notesAndCoins/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            value, 
            amount
        }
    });
};

export const updateCoins = ( amountsWithdrawn: PropsCoins[]): Promise<AxiosResponse> => {
    return api.put(`/notesAndCoins`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            amountsWithdrawn
        }
    });
};

export const updateMoneyAmount = ( id: number | string,amount:number): Promise<AxiosResponse> => {
    return api.patch(`/notesAndCoins/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            amount
        }
    });
};

export const deleteMoney = (id: number | string): Promise<AxiosResponse> => {
    return api.delete(`/notesAndCoins/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
    });
};



