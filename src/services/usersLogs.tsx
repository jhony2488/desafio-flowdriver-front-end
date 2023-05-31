import { AxiosResponse } from 'axios';
import { api } from './api';

export const getLogs = (id?: number): Promise<AxiosResponse> => {
    const filter = `?id=${id}`;

    if (id) {
        return api.get(`/logsClients${filter}`, {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
            },
        });
    }
    return api.get('/logsClients', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
    });
};

export const setLog = (
    prohibited: string | Date,
    exit: string | Date,
    price:number | null,
    paidOut:boolean,
    changeValue:number | null,
    paidOutPrice:number | null,
    priceVehicle:number | null,
    idUser:number
): Promise<AxiosResponse> => {
    return api.post('/logsClients', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            prohibited,
            exit,
            price,
            paidOut,
            changeValue,
            paidOutPrice,
            priceVehicle,
            idUser
        }
    });
};

export const updateLog = (
    prohibited: string | Date,
    exit: string | Date,
    price:number | null,
    paidOut:boolean,
    changeValue:number | null,
    paidOutPrice:number | null,
    priceVehicle:number | null,
    idUser:number,
    idLog:number | string
): Promise<AxiosResponse> => {
    return api.put(`/logsClients/${idLog}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            prohibited,
            exit,
            price,
            paidOut,
            changeValue,
            paidOutPrice,
            priceVehicle,
            idUser
        }
    });
};

export const deleteLog = (id: number | string): Promise<AxiosResponse> => {
    return api.delete(`/logsClients/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
    });
};



