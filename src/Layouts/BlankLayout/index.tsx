import React, { ReactElement } from 'react';
import {
    Fab,
} from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import ScrollTop from '../../Components/ScrollTop';
import { PropsBlankLayout } from '../../interfaces/layouts';


export default function BlankLayout(props: PropsBlankLayout): ReactElement {
    const { children } = props;
    return (
            <>
                {children}
                <ScrollTop {...props}>
                    <Fab
                        style={{ right: 6, borderRadius: 0 }}
                        size="small"
                        color="secondary"
                        aria-label="scroll back to top"
                    >
                        <KeyboardArrowUp />
                    </Fab>
                </ScrollTop>
            </>
    );
}
