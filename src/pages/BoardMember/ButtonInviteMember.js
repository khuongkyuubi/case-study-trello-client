import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Input from '@mui/material/Input';

import '../../Link.css'
const style = {
    position: 'absolute',
    top: '38%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height:170,
    bgcolor: 'background.paper',
   border: '0px solid #000',
    borderRadius:'2px',
    boxShadow: 24,
    p: 4,
    mb:8
};

export default function KeepMountedModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
         <div className="button-invite-member" style={{height:"30px",display:"flex",justifyContent:"center"}}><Button onClick={handleOpen} style={{color:"white",fontSize:"10px"}}>
            <PersonAddAltIcon style={{height:'15px'}}/> <span style={{color:"white",fontSize:"10px"}} >Invite Workspace members</span>
         </Button>
         </div>
    <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ h2: 1 ,fontSize:'20px',fontWeight:'bold'}}>Invite to Workspace</Typography>

                     <Input style={{ color:"primary",border:"none"}} placeholder="Email address or name"/>

                     <Typography sx={{ p: 1 ,fontSize:'12px',fontWeight:300,mt:'12px'}}>
                         Invite someone to this Workspace with a link
                     </Typography>



                </Box>
    </Modal>

</div>
    );
}