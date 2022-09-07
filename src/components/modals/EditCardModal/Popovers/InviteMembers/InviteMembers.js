import React, { useState } from 'react';
import { Container, SearchContainer, SearchBar, ChipContainer } from './styled';
import Button from '../../ReUsableComponents/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useDispatch, useSelector } from 'react-redux';
import {changeRoleUser, getUserFromEmail} from '../../../../../services/userService';
import { openAlert } from '../../../../../redux/Slices/alertSlice';
import { boardMemberAdd } from '../../../../../services/boardService';
import {useParams} from "react-router-dom";

const useStyles = makeStyles({
	root: {
		maxWidth: '8rem',
		opacity: '70%',
	},
});

const ChipComponent = (props) => {
	const { name, surname, email, callback } = props;
	const classes = useStyles();
	return (
		<Tooltip TransitionComponent={Zoom} title={`${name} ${surname}`} size='small' placement='top' arrow>
			<Chip
				className={classes.root}
				onDelete={() => callback(email)}
				avatar={<Avatar>{name.toString()[0]}</Avatar>}
				label={name}
				size='small'
				color='secondary'
			/>
		</Tooltip>
	);
};

const roles = [
	{
		id:new Date() +4,
		name:'owner'
	},
	{
		id:new Date() +9,
		name:'member'
	}
]


const InviteMembers = ({listMember}) => {
	const [memberMail, setMemberMail] = useState('');
	const [members, setMembers] = useState([]);
	const dispatch = useDispatch();
	const boardMembers = useSelector((state) => state.board.members);
	const boardId = useSelector(state=>state.board.id);

	const [role,setRole] = useState()



	const handleAddClick = async () => {
		const checkMember = boardMembers.filter((m) => m.email === memberMail)[0];

		if (checkMember) {
				dispatch(
					openAlert({
						message: `${checkMember.name} is already member of this board!`,
						severity: 'error',
					})
				)
			setMemberMail('');
			return;
		}

		const result = await getUserFromEmail(memberMail, dispatch);
		if (!result) return;
		setMembers((prev) => [...prev, result]);
		setMemberMail('');
	};
	const handleDelete = (email) => {
		const newMembers = members.filter((member) => member.email !== email);
		setMembers([...newMembers]);

	};

	const handleInviteClick= async()=>{
		await boardMemberAdd(boardId,members,dispatch);
		setMembers([]);
	}
    const {id}=useParams()

	const changeRole = async (e, idMember,idBoard) =>{

		await changeRoleUser(e.target.value, dispatch,idMember,idBoard);

	}



	return (
		<Container>
			<SearchContainer>
				<SearchBar
					type='email'
					placeholder="Member's Email"
					value={memberMail}
					onChange={(e) => {
						setMemberMail(e.target.value);
					}}
				/>
				<Button title='Add' style={{ flex: '1' }} clickCallback={handleAddClick} />
			</SearchContainer>


			{listMember.map(member => (
				<div key={member._id}>
					<span>{member.name}</span>
					<select defaultValue={member.role} onChange={async(e) => {
						await changeRole(e, member._id,id)
					}}   >
						{roles.map(role =>(
							<option value={role.name} key={role.id} >{role.name}</option>
						))}


					</select>
				</div>
				)
			)}




			<ChipContainer>
				{members.map((member) => {
					return <ChipComponent key={member.email} callback={handleDelete} {...member} />;
				})}
			</ChipContainer>
			{members.length > 0 && <Button clickCallback={handleInviteClick} title='Invite' />}
		</Container>
	);
};

export default InviteMembers;
