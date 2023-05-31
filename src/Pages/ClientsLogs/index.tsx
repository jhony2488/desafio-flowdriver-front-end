/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Typography, Container, Modal, Box, Button, Select, MenuItem, Input as InputComponent, InputAdornment } from '@material-ui/core';
import { TimePicker } from '@mui/lab';
import { getClients } from '../../services/usersClients';
import { isIntegerOrFloat } from '../../utils/isIntegirOrFloat';
import { getLogs, setLog, updateLog, deleteLog } from '../../services/usersLogs';
import { ContentList } from '../../Components';
import { PropsClientsLog } from '../../interfaces/clients';

import { useStyles } from './style';

export default function ClientsLogs() {
    const classes = useStyles();

    const clientsMock={
        prohibited: '',
        exit: '',
        price: null,
        paidOut: false,
        changeValue: null,
        paidOutPrice: null,
        priceVehicle: 0,
        idUser:0,
    };

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [clients, setClients] = useState<[]>([]);
    const [clientsLogs, setClientsLogs] = useState<[]>([]);
    const [clientLogs, setLogsClient] = useState<PropsClientsLog>(clientsMock);
    const [modo, setModo] = useState<string>('create');

    const [userId, setUserId] = useState<number>(0);
    const [dataLogClient, setDataLogClient] = useState<PropsClientsLog>(clientsMock);

    const handleModal = (item: PropsClientsLog): void => {
        setOpenModal(!openModal);
        setLogsClient(item);
        setDataLogClient(item);
        setModo('edit');
        setUserId(item.userId || 0);
    };

    const handleModalSet = (): void => {
        setOpenModal(!openModal);
        setLogsClient(clientsMock);
        setModo('create');
        setDataLogClient(clientsMock);
    };
    const closeModal = (): void => {
        setOpenModal(!openModal);
    };

    const handleDelete = async (id: number | string) => {
        deleteLog(id);
    };

    const handleSet = async () => {
        await setLog(dataLogClient.prohibited,
            dataLogClient.exit|| '',
            dataLogClient.price  ? null : dataLogClient.price,
            dataLogClient.paidOut,
            dataLogClient.changeValue,
            dataLogClient.paidOutPrice,
            dataLogClient.priceVehicle,
            userId);
        setDataLogClient(clientsMock);
    };

    const handleSubmitEdit = async () => {
        await updateLog(
            dataLogClient.prohibited,
            dataLogClient.exit || '',
            dataLogClient.price  ? null : dataLogClient.price,
            dataLogClient.paidOut,
            dataLogClient.changeValue,
            dataLogClient.paidOutPrice,
            dataLogClient.priceVehicle,
            userId,
            clientLogs.id || 0
        );
        setLogsClient(clientsMock);
    };

    useEffect(() => {
        getClients().then((items) => setClients(items.data.result));
        getLogs().then((items) => setClientsLogs(items.data.result));
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
                            {modo === 'edit' ? 'Editar Registro de Cliente' : 'Criar Registro de Cliente'}
                        </Typography>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userId}
                            label="Cliente"
                            onChange={(event: React.ChangeEvent<{ value: any }>) => setUserId(parseInt(event.target.value))}
                        >
                            {clients.map((item: { id: number; plate: string }, index: number) => {
                                return <MenuItem key={index} value={item.id}>{item.plate}</MenuItem>;
                            })}
                        </Select>

                        <TimePicker
                            label="Horário de entrada"
                            value={dataLogClient.prohibited || ''}
                            onChange={(value: string) => dataLogClient.prohibited = value}
                        />

                        <TimePicker
                            label="Horário de saida"
                            value={dataLogClient.exit || ''}
                            onChange={(value: string) => dataLogClient.prohibited = value}
                        />
                        <label htmlFor="input-title">
                            Pago
                        </label>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dataLogClient.paidOut ? 'true' : 'false'}
                            label="Cliente"
                            onChange={(event: React.ChangeEvent<{ value: any }>) => dataLogClient.paidOut = event.target.value === 'true' ? true : false}
                        >
                            <MenuItem value={'true'}>Sim</MenuItem>
                            <MenuItem value={'false'}>Não</MenuItem>
                        </Select>

                        <label htmlFor="input-title">
                            Preço Pago
                        </label>
                        <InputComponent
                            id="standard-adornment-amount"
                            onChange={(event: React.ChangeEvent<{ value: string }>) => dataLogClient.paidOutPrice = isIntegerOrFloat(event.target.value) ? parseFloat(event.target.value) : parseInt(event.target.value)}
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        />
                        <label htmlFor="input-title">
                            Preço que deverá ser pago por hora
                        </label>
                        {userId > 0 && userId != null && userId !== undefined && userId ?
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dataLogClient.priceVehicle ? 'true' : 'false'}
                                label="Cliente"
                                onChange={(event: React.ChangeEvent<{ value: any }>) => dataLogClient.paidOut = event.target.value === 'true' ? true : false}
                            >
                                {clients.map((item: { vehicleType: [{ value: string }]; plate: string }, index: number) => {
                                    return <MenuItem key={index} value={item.vehicleType[0].value}>{item.plate}</MenuItem>;
                                })}
                            </Select> : <></>
                        }

                        <div className={classes.containerButtons}>
                            <Button variant='contained' color='primary' onClick={() => modo === 'edit' ? handleSubmitEdit() : handleSet()}>
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
                    Registros de entrada e saida de Clientes
                </Typography>
                <Button variant='contained' color='primary' onClick={() => handleModalSet()}>
                    Adicionar Registro de entrada/saida de cliente
                </Button>
                <ContentList handleDelete={handleDelete} items={clientsLogs} openModalEdit={handleModal} />
            </Container>
        </>
    );
}
