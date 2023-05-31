/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Typography, Container, Modal, Box, Button, Select, MenuItem } from '@material-ui/core';
import { getVehicleTypes, setVehicleType, updateVehicleType, deleteVehicleType } from '../../services/vehicleTypes';
import { ContentList, Input } from '../../Components';
import { isIntegerOrFloat } from '../../utils/isIntegirOrFloat';
import {PropsVehicles } from '../../interfaces/vehicles';
import { useStyles } from './style';

export default function Vehicles() {
    const classes = useStyles();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [vehicles, setVehicles] = useState<[]>([]);
    const [vehicle, setVehicleUnique] = useState<PropsVehicles >({ id:0, name: '', value: 0});
    const [modo, setModo] = useState<string>('create');

    const [valueVehicle, setValueVehicle] = useState<string>('0');
    const [nameVehicle, setNameVehicle] = useState<string>('');

    const handleModal = (item: { name: string; value: number; }): void => {
        setOpenModal(!openModal);
        setVehicleUnique(item);
        setModo('edit');
        setNameVehicle(item.name);
        setValueVehicle(item.value.toString());
    };

    const handleModalSet = (): void => {
        setOpenModal(!openModal);
        setVehicleUnique({name: '', value: 0});
        setModo('create');
        setNameVehicle('');
        setValueVehicle('');
    };
    const closeModal = (): void => {
        setOpenModal(!openModal);
    };

    const handleDelete = async (id: number | string) => {
        deleteVehicleType(id);
    };

    const handleSet = async () => {
        await setVehicleType(nameVehicle, isIntegerOrFloat(valueVehicle) ? parseFloat(valueVehicle) : parseInt(valueVehicle));
        setNameVehicle('');
    };

    const handleSubmitEdit = async (id: number | string, name: string, value: number) => {
        await updateVehicleType(id, name, value);
        setVehicleUnique({name: '', value: 0});
    };

    useEffect(() => {
        getVehicleTypes().then((items) => setVehicles(items.data.result));
    }, []);

    return (
        <>
            <Modal
                open={openModal}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.box}>
                    <Box className={classes.boxWrapper}>
                        <Typography id="modal-modal-title" className={classes.titleModal} variant="h6" component="h2">
                            {modo === 'edit' ? 'Editar Veiculo' : 'Criar Veiculo'}
                        </Typography>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={nameVehicle}
                            label="Veiculo"
                            onChange={(event: React.ChangeEvent<{ value: any }>) => setNameVehicle(event.target.value)}
                        >
                            {vehicles.map((item: { id: number; name: string }, index) => {
                                return(<MenuItem key={index} value={item.name}>{item.name}</MenuItem>);
                            })}
                        </Select>

                        <label htmlFor="input-title">
                            Valor por hora
                        </label>
                        <Input id="input-title" value={valueVehicle || ''} onChange={(value) => setValueVehicle(value)} />


                        <div className={classes.containerButtons}>
                            <Button variant='contained' color='primary' onClick={() => modo === 'edit' ? handleSubmitEdit(vehicle?.id || '', nameVehicle, isIntegerOrFloat(valueVehicle) ? parseFloat(valueVehicle) : parseInt(valueVehicle),) : handleSet()}>
                                {modo === 'edit' ? 'Editar' : 'Criar'}
                            </Button>
                            <Button variant='contained' color='inherit' onClick={() => closeModal()}>
                                Sair
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Modal>
            <Container className={classes.main}>
                <Typography className={classes.title}>
                    Veiculos
                </Typography>
                <Button variant='contained' color='primary' onClick={() => handleModalSet()}>
                    Adicionar Veiculos
                </Button>
                <ContentList handleDelete={handleDelete} items={vehicles} openModalEdit={handleModal} notFound="Nenhum tipo de veiculo encontrado" />
            </Container>
        </>
    );
}
