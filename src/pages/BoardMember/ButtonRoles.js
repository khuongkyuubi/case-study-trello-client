import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import {Menu} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useDispatch} from "react-redux";
import {changeRoleUserTeam} from "../../services/teamService";

export default function ButtonDetailMember(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [roleUser, setRoleUser] = React.useState(props.role);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        if(props.isAdmin){
            setAnchorEl(event.currentTarget);
        }
    };
    const handleChoose = async (e, role) => {
        await changeRoleUserTeam(props.idMember, props.idTeam, dispatch, role,props.memberUser)
        setRoleUser(role);
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} variant="contained"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{
                        backgroundColor: '#e6eaee',
                        border: 'none',
                        color:'black',
                        fontSize:'10px'
                    }}>
                <span >{roleUser}</span>
            </Button>


                <Menu
                    id={id}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={()=> setAnchorEl(null)}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={e => handleChoose(e, "Admin")}>Admin</MenuItem>
                    <MenuItem onClick={e => handleChoose(e, "Member")}>Member</MenuItem>
                </Menu>


        </div>
    );
}