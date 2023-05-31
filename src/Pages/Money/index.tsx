import React, { useState, useEffect } from 'react';
import { Typography, Container, Modal, Box, Button } from '@material-ui/core';
import { getCoins, setMoney, updateMoney, deleteMoney } from '../../services/notesAndCoins';
import { ContentList, Input } from '../../Components';
import { isIntegerOrFloat } from '../../utils/isIntegirOrFloat';
import { useStyles } from './style';

export default function Money() {
    const classes = useStyles();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [coins, setCoins] = useState<[]>([]);
    const [money, setMoneyUnique] = useState<any>({});
    const [modo, setModo] = useState<string>('create');

    const [valueMoney, setValueMoney] = useState<string>('0');
    const [amountMoney, setAmountMoney] = useState<number>(0);

    const handleModal = (item: { value: string; amount: number; }): void => {
        setOpenModal(!openModal);
        setMoneyUnique(item);
        setModo('edit');
        setValueMoney(item.value);
        setAmountMoney(item.amount);
    };

    const handleModalSet = (): void => {
        setOpenModal(!openModal);
        setMoneyUnique({});
        setModo('create');
        setValueMoney('');
        setAmountMoney(0);
    };
    const closeModal = (): void => {
        setOpenModal(!openModal);
    };

    const handleDelete = async (id: number | string) => {
        deleteMoney(id);
    };

    const handleSet = async () => {
        await setMoney(valueMoney, amountMoney);
        setValueMoney('');
        setAmountMoney(0);
    };

    const handleSubmitEdit = async (id: number | string, value: string, amount: number) => {
        await updateMoney(id, value, amount);
        setMoneyUnique({});
    };

    useEffect(() => {
        getCoins().then((items) => setCoins(items.data.result));
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
                            {modo === 'edit' ? 'Editar Cedula/Moeda' : 'Criar Cedula/Moeda'}
                        </Typography>

                        <label htmlFor="input-title">
                            Valor
                        </label>
                        <Input id="input-title" value={valueMoney || ''} onChange={(value) => setValueMoney(value)} />

                        <label htmlFor="input-title">
                            Quantidade
                        </label>
                        <Input id="input-title" value={amountMoney.toString() || ''} onChange={(value) => setAmountMoney(
                            isIntegerOrFloat(value) ? parseFloat(value) : parseInt(value)
                        )} />



                        <div className={classes.containerButtons}>
                            <Button variant='contained' color='primary' onClick={() => modo === 'edit' ? handleSubmitEdit(money?.id, valueMoney, amountMoney,) : handleSet()}>
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
                    Moedas e Cedulas
                </Typography>
                <Button variant='contained' color='primary' onClick={() => handleModalSet()}>
                    Adicionar Moedas e Cedulas
                </Button>
                <ContentList handleDelete={handleDelete} items={coins} openModalEdit={handleModal}  notFound="Nenhuma Moeda e cedula encontrada" />
            </Container>
        </>
    );
}
