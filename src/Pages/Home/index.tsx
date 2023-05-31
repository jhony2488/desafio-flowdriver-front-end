import React, { useState, useEffect } from 'react';
import { Typography, Container, Modal } from '@material-ui/core';
import { useStyles } from './style';

export default function Home() {
    const classes = useStyles();

    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleModal = (): void => {
        setOpenModal(!openModal);
    };
    const closeModal = (): void => {
        setOpenModal(!openModal);
    };

    useEffect(() => {

    }, []);

    /*
              <Modal
                open={openModal}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.box}>
                    <Box className={classes.boxWrapper}>
                        <Typography id="modal-modal-title" className={classes.titleModal} variant="h6" component="h2">
                            Tarefa
                        </Typography>
                        <label htmlFor="input-title">
                            Titulo
                        </label>
                        <Input id="input-title" value={inputTitle || ''} onChange={setInputTitle} />

                        <FormControlLabel control={<Checkbox checked={inputCompleted} onChange={(event) => setInputCompleted(event.target.checked ? true : false)} />} label="Completada" />
                        <div className={classes.containerButtons}>
                            <Button variant='contained' color='primary' onClick={() => handleSubmitEditTask(inputTitle, inputCompleted)}>
                                Editar
                            </Button>
                            <Button variant='contained' color='inherit' onClick={() => closeModal()}>
                                Sair
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Modal>
    */

    return (
        <>

            <Container className={classes.main}>
                <Typography className={classes.title}>
                    Desafio Flowdriver
                </Typography>
                <a href="">Ver Clientes</a>
                <a href="">Criar Clientes</a>
                <a href="">Ver Logs de Clientes</a>
                <a href="">Ver moedas e cedulas disponiveis</a>
                <a href="">Inserir moedas e cedulas</a>
                <a href="">Ver moedas veiculos e seus preços</a>
                <a href="">Criar veiculo</a>
            </Container>
        </>
    );
}
