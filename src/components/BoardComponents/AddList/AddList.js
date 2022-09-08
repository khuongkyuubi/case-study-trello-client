import React, {useEffect, useRef, useState} from 'react';
import * as style from './styled';
import AddIcon from '@mui/icons-material/Add';
import BottomButtonGroup from '../BottomButtonGroup/BottomButtonGroup';
import {TextSpan} from '../../../pages/BoardPage/CommonStyled';
import {useDispatch, useSelector} from 'react-redux';
import {createList} from '../../../services/boardService';
import {CircularProgress, Popover, Typography} from "@mui/material";
import {isMemberOfBoard} from "../../../utils/checkMemberRoleOfBoard";

const AddList = (props) => {
    const {userInfo}=useSelector(state=>state.user)
    const {members}=useSelector(state=>state.board)
    const isMember=isMemberOfBoard(userInfo._id,members)
    const [pending, setPending] = useState(false)

    const dispatch = useDispatch();
    const [addList, setAddList] = useState(false);
    const [title, setTitle] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const ref = useRef();

    // useEffect(() => {
    // 	if(addList)
    // 	ref.current.focus();
    // }, [addList]);

    const handleCloseClick = () => {
        setAnchorEl(null);
        setTitle('');
    };
    const handleAddClick = async () => {
        setAddList(false);
        setPending(true);
       await createList(title, props.boardId, dispatch);
        setPending(false);
        setTitle('');
        setAnchorEl(null);

    };
    const handleAddEnter = (event) => {
        if (event.key === 'Enter') {
            setAddList(false);
            createList(title, props.boardId, dispatch);
            setTitle('');
            setAnchorEl(null);
        }

    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        // ref.current.focus();
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return pending ? (<CircularProgress size={"2rem"} />) : (
        <>
            <style.AddAnotherListContainer>
                <style.AddAnotherListButton show={false} onClick={(event) => {
                    if(!isMember) return;
                    handleClick(event)
                }}>
                    <AddIcon/>
                    <TextSpan>Add another List</TextSpan>
                </style.AddAnotherListButton>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <style.AddListContainer show={true}>
                        <style.AddListWrapper>
                            <style.ListTitleInput
                                ref={ref}
                                placeholder='Enter list title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={e => handleAddEnter(e)}
                            />
                            <BottomButtonGroup
                                disabled={!Boolean(title)}
                                title='Add list'
                                clickCallback={handleAddClick}
                                closeCallback={handleCloseClick}
                            />
                        </style.AddListWrapper>
                    </style.AddListContainer>
                </Popover>
                {/*<style.AddListContainer show={addList}>*/}
                {/*	<style.AddListWrapper>*/}
                {/*		<style.ListTitleInput*/}
                {/*			ref={ref}*/}
                {/*			placeholder='Enter list title'*/}
                {/*			value={title}*/}
                {/*			onChange={(e) => setTitle(e.target.value)}*/}
                {/*		/>*/}
                {/*		<BottomButtonGroup*/}
                {/*			title='Add list'*/}
                {/*			clickCallback={handleAddClick}*/}
                {/*			closeCallback={handleCloseClick}*/}
                {/*		/>*/}
                {/*	</style.AddListWrapper>*/}
                {/*</style.AddListContainer>*/}
            </style.AddAnotherListContainer>
        </>
    );
};

export default AddList;
