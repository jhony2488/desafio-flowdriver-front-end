import { AxiosResponse } from 'axios';
import { api } from './api';

export const getClients = (id?: number): Promise<AxiosResponse> => {
    const filter = `?id=${id}`;

    if (id) {
        return api.get(`/clients${filter}`, {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
            },
        });
    }
    return api.get('/clients', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
    });
};

export const setClient = (plate: string,VehicleTypeId: number,LogClients: [],): Promise<AxiosResponse> => {
    return api.post('/clients', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            plate,
            VehicleTypeId,
            LogClients
        }
    });
};

export const updateClient = (id: number | string, plate: string,VehicleTypeId: number): Promise<AxiosResponse> => {
    return api.put(`/clients/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            plate,
            VehicleTypeId,
        }
    });
};

export const deleteClient = (id: number | string): Promise<AxiosResponse> => {
    return api.delete(`/clients/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
    });
};



