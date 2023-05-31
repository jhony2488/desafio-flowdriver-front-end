import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { useStyles } from './style';

export default function Home() {
    const classes = useStyles();

    return (
        <>

            <Container className={classes.main}>
                <Typography className={classes.title}>
                    Desafio Flowdriver
                </Typography>
                <a href="/clients">Ver Clientes</a>
                <a href="/clients/logs">Ver Registros de Clientes</a>
                <a href="/money">Ver moedas e cedulas disponiveis</a>
                <a href="/veiculos">Ver tipos de veiculos e seus preços</a>
            </Container>
        </>
    );
}
