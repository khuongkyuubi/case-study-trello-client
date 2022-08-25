import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonDetailMember() {
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
                        color:'black',
                        fontSize:'10px'
                    }}>
                <span > Remove ...</span>
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
                sx={{width:1200,height:1000,display: 'flex',ml:'25%',mt:0.5,fontSize:"10px"}}
            >
                <div style={{marginLeft:"5px"}}>

                <Typography sx={{ h3: 2 ,ml:2,display: 'flex',color:'#788396',width:"100%"}}>Remove or deactivate member</Typography>
                <hr/>

                <span>Remove from Workspace
                <p style={{fontSize:'8px',color:"#788396"}}>Remove all access to the Workspace.</p>
                </span>

                <Typography sx={{ p: 1 ,fontSize:"10px"}}>
                   <p>....................................................</p>
                   <p> .....................................................</p>
                   <p> .....................................................</p>
                </Typography>


                <div >
                    <span>Deactivate </span>
                    <Typography sx={{ p: 1,fontSize:"10px",color:'#788396' }}>
                        Disable member's access to Workspace boards,
                        but allow other Workspace members to see what cards and boards the member was on.
                    </Typography>
                </div>
                </div>


            </Popover>
        </div>
    );
}