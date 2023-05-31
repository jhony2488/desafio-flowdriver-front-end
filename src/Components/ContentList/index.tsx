import React, { useState, useEffect } from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from '@material-ui/core';
import { contentStyles } from './style';
import { Edit, CheckCircle, Close, DeleteOutline } from '@material-ui/icons';

export interface Props {
    items: any[];
    openModalEdit: (item: {}) => void;
    handleDelete: (id: number) => void;
}

export default function ContentList({ items, openModalEdit,handleDelete }: Props) {
    const { container, card, textContent, textNotItems,spanTextContent,cardContent } = contentStyles();

    const [result, setResult] = useState<any[]>(items);

    useEffect(() => {
        setResult([]);
        setResult(items);
    }, [items]);

    return (
        <div className={container}>
            {result.length > 0 ? result?.map((item: any, index: number) => (
                <Card key={index} className={card}>
                    <CardContent className={cardContent}>
                        <Typography variant="h4" className={textContent}>
                            {item.title}  
                        </Typography>
                        <span className={spanTextContent}>{item.completed ? <CheckCircle color='secondary' /> : <Close color='error' />}</span>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' color='primary' onClick={() => openModalEdit(item)}>
                            <Edit />
                        </Button>
                        <Button variant='contained' color='primary' onClick={() => handleDelete(item?.id)}>
                            <DeleteOutline color='error' />
                        </Button>
                    </CardActions>
                </Card>
            )) : <Typography variant="h4" className={textNotItems}>
                Nenhuma tarefa encontrada
            </Typography>}
        </div>
    );
};
