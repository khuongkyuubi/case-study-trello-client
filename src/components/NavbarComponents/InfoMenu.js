import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {styled as muiStyled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {Card, CardActions, CardContent, CardMedia, Divider, Grid, Paper, Typography} from "@mui/material";
import styled from 'styled-components';
import {IconWrapper} from "../Styled";


const BootstrapButton = muiStyled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    padding: '0.25rem 0rem',
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    marginLeft: '0.5rem',
    display: 'block',
    maxWidth: '30px',

    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:active': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
});

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0 0.5rem;
  color: #fff;
  margin-left: 0.5rem;
  font-size: 0.8rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
  }
`;


const StyledIcon = muiStyled(InfoOutlinedIcon)({
    fontSize: '1.5rem',
    padding: 0
});

export default function InfoMenu(props) {
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
                            <Typography inline={"true"} variant="body1" align="center">Information</Typography>
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
