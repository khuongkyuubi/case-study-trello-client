import React, { useState } from 'react';
import { DeleteButton} from '../Labels/styled';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {attachmentDelete} from "../../../../../services/cardService";
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	height: fit-content;
	width: 100%;
`;

const DeleteAttachmentPopover = (props) => {
    const dispatch = useDispatch();
    const card = useSelector((state) => state.card);
    const handleDeleteClick = async () => {
        props.closeCallback()
        await attachmentDelete(card.cardId, card.listId, card.boardId, props._id, dispatch);
    };
    return (
        <Container>
            <DeleteButton style={{ marginTop: '1rem' }} onClick={handleDeleteClick}>
               Delete
            </DeleteButton>
        </Container>
    );
};

export default DeleteAttachmentPopover;
