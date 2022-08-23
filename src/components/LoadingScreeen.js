import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import styled from 'styled-components';

const Icon = styled.img`
  width: 10vw
`;

const LoadingScreen = () => {
    const [open, setOpen] = useState(true);
    // const handleClose = () => {
    //     setOpen(false);
    // }

    return (
        <div>
            <Backdrop
                open={open}
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                //onClick={handleClose
            >
                <Icon
                    src='https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif'
                />
            </Backdrop>
        </div>
    )


};
export default LoadingScreen;