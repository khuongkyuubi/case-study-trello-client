import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/Slices/userSlice';
import {reset} from '../../redux/Slices/boardsSlice';
import BasePopover from '../modals/EditCardModal/ReUsableComponents/BasePopover';
import {Button} from "../modals/EditCardModal/Comment/styled";
import {Divider, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import {useNavigate} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";


function WorkIcon() {
    return null;
}

function BeachAccessIcon() {
    return null;
}

function ImageIcon() {
    return null;
}

export default function ProfileBox() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [profilePopoverEl, setProfilePopoverEl] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const name = useSelector((state) => state.user.userInfo.name);
    const color = useSelector((state) => state.user.userInfo.color);
    const avatar = useSelector((state) => state.user.userInfo.avatar);
    const email = useSelector((state) => state.user.userInfo.email);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setProfilePopoverEl(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null);
        setProfilePopoverEl(null);

    };
    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Tooltip title='Profile settings'>
                    <IconButton onClick={handleClick} size='small' sx={{ml: '0.35rem'}}>
                        <Avatar
                            alt={name}
                            src={process.env.REACT_APP_AVATAR_ENDPOINT + '/' + avatar}
                            sx={{width: 32, height: 32, bgcolor: color, fontSize: '0.875rem', fontWeight: '800'}}>
                            {name[0]}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>

            {profilePopoverEl && (
                <BasePopover
                    anchorElement={profilePopoverEl}
                    closeCallback={handleClose}
                    title={'account'}
                    contents={
                        <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                            <Divider/>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={name}
                                            src={process.env.REACT_APP_AVATAR_ENDPOINT + '/' + avatar}
                                            sx={{width: '3rem', height: '3rem', marginRight: '0.5rem', bgcolor: color}}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary={name} secondary={email}/>
                                </ListItem>
                                <Divider component="li"/>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => navigate("/settings")}>
                                        <ListItemText primary="Settings"/>
                                    </ListItemButton>
                                </ListItem>
                                <Divider component="li"/>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => {
                                        dispatch(reset());
                                        dispatch(logout());
                                    }}>
                                        <ListItemText primary="Logout"/>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    }
                />
            )}


            {/*<Menu*/}
            {/*    anchorEl={anchorEl}*/}
            {/*    open={open}*/}
            {/*    onClose={handleClose}*/}
            {/*    onClick={handleClose}*/}
            {/*    PaperProps={{*/}
            {/*        elevation: 0,*/}
            {/*        sx: {*/}
            {/*            overflow: 'visible',*/}
            {/*            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',*/}
            {/*            mt: 1.5,*/}
            {/*            '& .MuiAvatar-root': {*/}
            {/*                width: 32,*/}
            {/*                height: 32,*/}
            {/*                ml: -0.5,*/}
            {/*                mr: 1,*/}
            {/*            },*/}
            {/*            '&:before': {*/}
            {/*                content: '""',*/}
            {/*                display: 'block',*/}
            {/*                position: 'absolute',*/}
            {/*                top: 0,*/}
            {/*                right: 14,*/}
            {/*                width: 10,*/}
            {/*                height: 10,*/}
            {/*                bgcolor: 'background.paper',*/}
            {/*                transform: 'translateY(-50%) rotate(45deg)',*/}
            {/*                zIndex: 0,*/}
            {/*            },*/}
            {/*        },*/}
            {/*    }}*/}
            {/*    transformOrigin={{ horizontal: 'right', vertical: 'top' }}*/}
            {/*    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}*/}
            {/*>*/}
            {/*    <MenuItem*/}
            {/*        onClick={() => {*/}
            {/*            // dispatch(reset);*/}
            {/*            dispatch(logout());*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <ListItemIcon>*/}
            {/*            <Logout fontSize='small' />*/}
            {/*        </ListItemIcon>*/}
            {/*        Logout*/}
            {/*    </MenuItem>*/}
            {/*</Menu>*/}
        </React.Fragment>
    );
}
