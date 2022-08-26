import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {styled as muiStyled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import {Card, CardActions, CardContent, CardMedia, Divider, Grid, Paper, Typography} from "@mui/material";
import styled from 'styled-components';
import {IconWrapper} from '../Styled'





const StyledIcon = muiStyled(AppRegistrationRoundedIcon)({
    fontSize: '1.5rem',
    padding: 0
});

export default function AppMenu(props) {
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

                onClick={handleClick}
            >
                <AppRegistrationRoundedIcon/>
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
                            <Typography inline={"true"} variant="body1" align="center">App menu</Typography>
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
                                image="https://a.trellocdn.com/prgb/dist/images/tips/info-image-02@1x.77d4b431a528da2dd7c6.png"
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
