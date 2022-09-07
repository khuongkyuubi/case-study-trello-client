import React, {useState} from 'react';
import { Container, Title } from './styled';
import Button from '../ReUsableComponents/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import {deleteCard}  from '../../../../services/listService';
import BasePopover from "../ReUsableComponents/BasePopover";
import DeleteAttachmentPopover from "../Popovers/Attachment/DeleteAttachment";
import DeleteCardPopover from "./deleteCard/DeleteCardPopover";
const Actions = () => {
	const card = useSelector((state) => state.card);
	const dispatch = useDispatch();
	const [isDelete,setIsDelete] = useState(null)
	const [popoverComponent,setPopoverComponent] = useState(null)
	return (
		<Container>
			<Title>Actions</Title>
			{/*/!* 	<Button title='Move' icon={<ArrowForwardIcon fontSize='1rem' />}></Button>*/}
			<Button
				title='Delete'
				icon={<DeleteIcon fontSize='small' />}
				clickCallback={(e)=> {
					e.stopPropagation()
					// deleteCard(card.boardId, card.listId, card.cardId, dispatch);
					setIsDelete(e.currentTarget)
					setPopoverComponent(card)
				}}
			>.</Button>
			{/*<Button title='Watch' icon={<WatchIcon fontSize='small' />}></Button> */}
			{
				isDelete&&(
					<BasePopover
						anchorElement={isDelete}
						closeCallback={() => {
							setIsDelete(null);
						}}
						title='Delete card?'
						contents={
							<DeleteCardPopover
								{...popoverComponent}
								closeCallback={() => {
									setIsDelete(null);
								}}
							/>
						}
					/>
				)
			}
		</Container>
	);
};

export default Actions;
