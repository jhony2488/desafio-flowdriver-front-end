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
import { validationKeys, validationValues } from '../../utils/validationsContentList';


export interface Props {
    items: any[];
    openModalEdit: (item: any) => void;
    handleDelete: (id: number) => void;
    notFound?: string;
}

export default function ContentList({ items, openModalEdit, handleDelete, notFound }: Props) {
    const { container, card, textContent, textNotItems, spanTextContent, cardContent } = contentStyles();

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
                        {
                            Object.entries(item).forEach(([key, value]: any) => {
                                return (
                                    <Typography variant="h4" className={textContent}>
                                        <span className={spanTextContent}>{
                                            validationKeys(key)
                                        }:</span>

                                        {validationValues(value)}
                                    </Typography>
                                )
                            })
                        }
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
                {notFound ? notFound : 'Nenhum item encontrado'}
            </Typography>}
        </div>
    );
};
