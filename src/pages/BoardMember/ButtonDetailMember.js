import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonDetailMember({isAdmin}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {

        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}
                    style={{
                        backgroundColor: '#e6eaee',
                        border: 'none',
                        color: ' #788396',
                        fontSize: '10px',

                    }}>
                <span style={{textDecoration: "underline"}}>On 1 board</span>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{width: 1300, height: 1000, display: 'flex', justifyContent: 'center', mt: 0.5, fontSize: "10px"}}
            >
                <div style={{marginLeft: "5px"}}>


                    <Typography
                        sx={{h3: 2, ml: 2, display: 'flex', justifyContent: 'center', color: '#788396', width: "100%"}}>Workspace
                        boards</Typography>
                    <hr/>

                    <Typography sx={{p: 1, fontSize: "10px"}} style={{color: '#788396'}}>duonga2qp is a member of the
                        following Workspace boards. They were last active </Typography>
                    <hr/>
                    <div>
                        <Typography sx={{p: 1, fontSize: "10px"}}>View member's Workspace cards</Typography>
                    </div>

                </div>

            </Popover>
        </div>
    );
}