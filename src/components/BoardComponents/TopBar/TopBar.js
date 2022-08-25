import React, {useEffect, useState} from 'react';
import * as style from './styled';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as common from '../../../pages/BoardPage/CommonStyled';
import {useDispatch, useSelector} from 'react-redux';
// import {boardTitleUpdate} from '../../../../../Services/boardsService';
// import RightDrawer from '../../../../Drawers/RightDrawer/RightDrawer';
// import BasePopover from '../../../../Modals/EditCardModal/ReUsableComponents/BasePopover';
// import InviteMembers from '../../../../Modals/EditCardModal/Popovers/InviteMembers/InviteMembers';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {AvatarGroup} from "@mui/material";


const TopBar = () => {
    const board = useSelector((state) => state.board);
    const [currentTitle, setCurrentTitle] = useState(board.title);
    const [showDrawer, setShowDrawer] = useState(false);
    const [invitePopover, setInvitePopover] = React.useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!board.loading)
            setCurrentTitle(board.title);
    }, [board.loading, board.title]);
    const handleTitleChange = () => {
        // boardTitleUpdate(currentTitle, board.id, dispatch);
    };
    return (
        <style.TopBar>
            <style.LeftWrapper>
                <style.BoardNameInput
                    placeholder='Board Name'
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                    onBlur={handleTitleChange}
                />
                <span style={{color: "white", fontSize: "1.25rem"}}>|</span>

                {/*Avatar group, for invite member*/}
                <AvatarGroup max={4} sx={{
                    '& .MuiAvatar-root': { width: 32, height: 32, fontSize: "1rem" },
                }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg"/>
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg"/>
                </AvatarGroup>

                <style.InviteButton onClick={(event) => setInvitePopover(event.currentTarget)}>
                    <PersonAddAltIcon/>
                    <style.TextSpan>Add Member</style.TextSpan>
                </style.InviteButton>
                {/*{invitePopover && (*/}
                {/*    <BasePopover*/}
                {/*        anchorElement={invitePopover}*/}
                {/*        closeCallback={() => {*/}
                {/*            setInvitePopover(null);*/}
                {/*        }}*/}
                {/*        title='Invite Members'*/}
                {/*        contents={<InviteMembers closeCallback={() => {*/}
                {/*            setInvitePopover(null);*/}
                {/*        }}/>}*/}
                {/*    />*/}
                {/*)}*/}
            </style.LeftWrapper>

            <style.RightWrapper>
                <common.Button onClick={() => {
                    setShowDrawer(true)
                }}>
                    <MoreHorizIcon/>
                    <style.TextSpan>Show menu</style.TextSpan>
                </common.Button>
            </style.RightWrapper>
            {/*<RightDrawer show={showDrawer} closeCallback={() => {*/}
            {/*    setShowDrawer(false)*/}
            {/*}}/>*/}
        </style.TopBar>
    );
};

export default TopBar;
