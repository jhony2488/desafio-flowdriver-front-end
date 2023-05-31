import { AxiosResponse } from 'axios';
import { api } from './api';

export const getVehicleTypes = (id?: number): Promise<AxiosResponse> => {
    const filter = `?id=${id}`;

    if (id) {
        return api.get(`/vehicleType${filter}`, {
            headers: {
                Authorization: process.env.REACT_APP_API_KEY,
            },
        });
    }
    return api.get('/vehicleType', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
    });
};

export const setVehicleType= (name: string, value:number): Promise<AxiosResponse> => {
    return api.post('/vehicleType', {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            name,
            value
        }
    });
};

export const updateVehicleType = (id: number | string, name: string, value:number): Promise<AxiosResponse> => {
    return api.put(`/vehicleType/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
        data: {
            name,
            value
        }
    });
};

export const deleteVehicleType = (id: number | string): Promise<AxiosResponse> => {
    return api.delete(`/vehicleType/${id}`, {
        headers: {
            Authorization: process.env.REACT_APP_API_KEY,
        },
    });
};



