import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function BasicPopover() {
    const [anchorEl2, setAnchorEl] = React.useState(null);

    const handleClick2 = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl(null);
    };

    const open2 = Boolean(anchorEl2);
    const id2= open2 ? 'simple-popover' : undefined;

    return (
        <div>

            <Popover
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                onClose={handleClose2}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >

                <Typography sx={{ p: 2 }}>Detail .</Typography>



            </Popover>
        </div>
    );
}
