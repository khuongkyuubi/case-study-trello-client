import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {styled as muiStyled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import {Card, CardActions, CardContent, CardMedia, Divider, Grid, Paper, Typography} from "@mui/material";
import styled from 'styled-components';
import {IconWrapper} from '../Styled'





const StyledIcon = muiStyled(NotificationsNoneOutlinedIcon)({
    fontSize: '1.5rem',
    padding: 0
});

export default function NotifyMenu(props) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = async (event) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {/*<BootstrapButton*/}
            {/*    onClick={handleClick}*/}
            {/*>*/}
            {/*    <StyledIcon/>*/}
            {/*</BootstrapButton>*/}

            <IconWrapper
                isNotify='true'
                onClick={handleClick}
            >
                <StyledIcon/>
            </IconWrapper>

            <Paper>
                <Menu
                    sx={{
                        maxWidth: 450,
                        marginTop: '0.5rem'
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    transformOrigin={{horizontal: 'center', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                >

                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                        }}
                    >
                        <Grid container justify="space-between">
                            <Typography inline={"true"} variant="body1" align="center">Notification</Typography>
                        </Grid>
                        <Divider/>
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                        }}
                    >
                        <Card sx={{maxWidth: "100%"}}>
                            <CardMedia
                                component="img"
                                height="auto"
                                image="https://a.trellocdn.com/prgb/dist/images/tips/info-image-01@1x.3e2ea266f7e19b3e13a9.png"
                                alt="green iguana"
                            />

                        </Card>

                    </MenuItem>
                    <MenuItem>
                        <Typography noWrap variant="h5" component="div" align={'center'}>
                            Get inspired by dozens of different Trello workflows
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography variant="body2" color="text.secondary">
                            Get insprired by dozens of different Trello workflows
                        </Typography>

                    </MenuItem>
                    <MenuItem>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </MenuItem>
                </Menu>
            </Paper>
        </div>
    );
}
