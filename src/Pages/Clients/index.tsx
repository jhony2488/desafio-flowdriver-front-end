import React, { useState, useEffect } from 'react';
import { Typography, Container, Modal, Box, Button, Select, MenuItem } from '@material-ui/core';
import { TimePicker } from '@mui/lab';
import { getClients, deleteClient, updateClient, setClient } from '../../services/usersClients';
import { getVehicleTypes } from '../../services/vehicleTypes';
import { ContentList, Input } from '../../Components';
import { useStyles } from './style';

export default function Clients() {
    const classes = useStyles();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openSetLog, setOpenSetLog] = useState<boolean>(false);
    const [clients, setClients] = useState<[]>([]);
    const [vehicles, setVehicles] = useState<[]>([]);
    const [client, setClientUnique] = useState<any>({});
    const [modo, setModo] = useState<string>('create');

    const [vehicleTypeId, setVehicleTypeId] = useState<number>(0);
    const [LogClients, setLogsClients] = useState<any[]>([]);
    const [plate, setPlate] = useState<string>('');

    const handleModal = (item: { plate: string; VehicleTypeId: number; }): void => {
        setOpenModal(!openModal);
        setClientUnique(item);
        setModo('edit');
        setPlate(item.plate);
        setVehicleTypeId(item.VehicleTypeId);
    };

    const handleModalSet = (): void => {
        setOpenModal(!openModal);
        setClientUnique({});
        setModo('create');
        setPlate('');
    };
    const closeModal = (): void => {
        setOpenModal(!openModal);
    };

    const handleDelete = async (id: number | string) => {
        deleteClient(id);
    };

    const handleSet = async () => {
        await setClient(plate, vehicleTypeId, LogClients);
        setPlate('');
    };

    const handleSubmitEdit = async (id: number | string, plate: string, VehicleTypeId: number) => {
        await updateClient(id, plate, VehicleTypeId);
        setClientUnique({});
    };

    useEffect(() => {
        getClients().then((items) => setClients(items.data.result));
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
                            {modo === 'edit' ? 'Editar Cliente' : 'Criar Cliente'}
                        </Typography>
                        <label htmlFor="input-title">
                            Placa
                        </label>
                        <Input id="input-title" value={plate || ''} onChange={setPlate} />

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={vehicleTypeId}
                            label="Veiculo"
                            onChange={(event: React.ChangeEvent<{ value: any }>) => setVehicleTypeId(parseInt(event.target.value))}
                        >
                            {vehicles.map((item: { id: number; name: string }, index) => {
                              return  (<MenuItem  key={index}value={item.id}>{item.name}</MenuItem>);
                            })}
                        </Select>

                        {modo === 'create' ? <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={openSetLog}
                            label="Registrar Entrada"
                            onChange={(event:  React.ChangeEvent<{ value: any }>) => setOpenSetLog(event.target.value === 'true' ? true : false)}
                        >
                            <MenuItem value={'true'}>Sim</MenuItem>
                            <MenuItem value={'false'}>Não</MenuItem>
                        </Select> : <></>}

                        {
                            openSetLog ?
                                <>
                                    <Typography id="modal-modal-title" className={classes.titleModal} variant="h6" component="h2">
                                        Registrar Entrada
                                    </Typography>
                                    <label htmlFor="input-title">
                                        Horario de entrada
                                    </label>
                                    <TimePicker
                                        label="Controlled picker"
                                        value={LogClients[0].prohibited || ''}
                                        onChange={(value: string) => setLogsClients(
                                            [
                                                {
                                                    prohibited: value,
                                                    exit: '',
                                                    price: null,
                                                    paidOut: false,
                                                    changeValue: null,
                                                    paidOutPrice: null,
                                                    priceVehicle: vehicles.filter((item: { id: number }) => item.id === vehicleTypeId),
                                                    idUser: null
                                                }
                                            ]
                                        )}
                                    />
                                </> : <></>
                        }

                        <div className={classes.containerButtons}>
                            <Button variant='contained' color='primary' onClick={() => modo === 'edit' ? handleSubmitEdit(client?.id, plate, vehicleTypeId,) : handleSet()}>
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
                    Clientes
                </Typography>
                <Button variant='contained' color='primary' onClick={() => handleModalSet()}>
                    Adicionar Clientes
                </Button>
                <ContentList handleDelete={handleDelete} items={clients} openModalEdit={handleModal} notFound='Nenhum cliente encontrado' />
            </Container>
        </>
    );
}
