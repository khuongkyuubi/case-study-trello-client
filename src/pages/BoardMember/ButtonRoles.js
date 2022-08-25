import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

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
                <span > Normal ...</span>
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
                sx={{width:1400,height:1000,display: 'flex',justifyContent: 'center',ml:'2.5%',mt:0.5,fontSize:"10px"}}
            >
                <div style={{marginLeft:"5px"}}>

                <Typography sx={{ h3: 2 ,ml:2,display: 'flex',justifyContent: 'center',color:'#788396',width:"100%"}}>Change permissions</Typography>
                <hr/>
                    <span>Admin</span>
                    <Typography sx={{ p: 1 ,fontSize:"10px"}}>duonga2qp is a member of the following Workspace boards. They were last active </Typography>
                <div style={{color:'#788396'}}>
                    <span>Normal</span> <span ><DoneOutlineIcon style={{width:'10Px',marginTop:'2px'}}/></span>
                    <Typography sx={{ p: 1,fontSize:"10px" }}>View member's Workspace cards</Typography>
                </div>
                </div>


            </Popover>
        </div>
    );
}