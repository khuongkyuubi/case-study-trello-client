import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BottomButtonGroup from '../../.././../components/BoardComponents/BottomButtonGroup/BottomButtonGroup';
import BasePopover from '../ReUsableComponents/BasePopover';

import {
	Container,
	LeftContainer,
	RightContainer,
	Title,
	CommentWrapper,
	ButtonContainer,
	CommentArea,
	LinkContainer,
	Link,
	Button,
} from './styled';

import { Avatar } from '@mui/material';
import {commentDelete} from '../../../../services/cardService';
import LabelsPopover from "../Popovers/Labels/LabelsPopover";

const Comment = (props) => {
	const [edit, setEdit] = useState(true);
	const [comment, setComment] = useState(props.text);
	const user = useSelector((state) => state.user.userInfo);
	const card = useSelector((state) => state.card);
	const dispatch = useDispatch();
	const [deletePopover, setDeletePopover] = useState(null);


	const handleDeleteClick = async () => {
		await commentDelete(card.cardId, card.listId, card.boardId, props._id, dispatch);
	};

	const handleClickDelete = (e) => {
		setDeletePopover(e.target)
	}

	return (
		<>
			<Container>
				<LeftContainer>
					<Avatar
						sx={{ width: 28, height: 28, bgcolor: props.color, fontSize: '0.875rem', fontWeight: '800' }}
					>
						{props.userName[0].toUpperCase()}
					</Avatar>
				</LeftContainer>
				<RightContainer>
					<Title>{props.userName}</Title>
					<CommentWrapper>
						<CommentArea value={comment} onChange={(e) => setComment(e.target.value)} readOnly={edit} />
						<ButtonContainer show={!edit}>
							<BottomButtonGroup
								title='Save'
								closeCallback={() => {
									setEdit(true);
								}}
							/>
						</ButtonContainer>
						<LinkContainer show={edit && user.name === props.userName}>
							<Link onClick={handleClickDelete}>Delete</Link>
							{deletePopover && (
								<BasePopover
									anchorElement={deletePopover}
									closeCallback={() => {
										setDeletePopover(null);
									}}
									title={'Delete this comment!'}
									contents={
										<Button onClick={handleDeleteClick}>Confirm Delete</Button>
									}
								/>
							)}
						</LinkContainer>
					</CommentWrapper>

				</RightContainer>
			</Container>
		</>
	);
};

export default Comment;
