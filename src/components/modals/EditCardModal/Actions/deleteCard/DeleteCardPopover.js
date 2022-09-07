import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {DeleteButton} from "../../Popovers/Labels/styled";
import {deleteCard} from "../../../../../services/listService";
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	height: fit-content;
	width: 100%;
`;

const DeleteCardPopover = (props) => {
    const dispatch = useDispatch();
    const card = useSelector((state) => state.card);
    const handleDeleteClick = async () => {
        props.closeCallback()
        await deleteCard(card.boardId, card.listId, card.cardId, dispatch);
    };
    return (
        <Container>
            <DeleteButton style={{ marginTop: '1rem' }} onClick={handleDeleteClick}>
                Delete
            </DeleteButton>
        </Container>
    );
};

export default DeleteCardPopover;
