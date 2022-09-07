import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonDetailMember() {


    return (
        <div>
            <Button variant="contained"
                    style={{
                        backgroundColor: '#e6eaee',
                        border: 'none',
                        color:'black',
                        fontSize:'10px'
                    }}>
                <span > Remove </span>
            </Button>
        </div>
    );
}