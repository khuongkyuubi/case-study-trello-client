import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BottomButtonGroup from '../../.././../components/BoardComponents/BottomButtonGroup/BottomButtonGroup';
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
} from './styled';

import { Avatar } from '@mui/material';

const Comment = (props) => {
	const [edit, setEdit] = useState(true);
	const [comment, setComment] = useState(props.text);
	const user = useSelector((state) => state.user.userInfo);
	const card = useSelector((state) => state.card);
	const dispatch = useDispatch();

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
					</CommentWrapper>

				</RightContainer>
			</Container>
		</>
	);
};

export default Comment;
