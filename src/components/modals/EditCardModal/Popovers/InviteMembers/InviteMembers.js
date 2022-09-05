import React, {useState} from 'react';
import {Container, SearchContainer, SearchBar, ChipContainer} from './styled';
import Button from '../../ReUsableComponents/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import {makeStyles} from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import {useDispatch, useSelector} from 'react-redux';
import {changeRoleUser, getUserFromEmail} from '../../../../../services/userService';
import {openAlert} from '../../../../../redux/Slices/alertSlice';
import {boardMemberAdd, deleteMemberInBoard} from '../../../../../services/boardService';
import {useParams} from "react-router-dom";
import {memRoles} from "../../../../../utils/roles";
import {Delete} from "@mui/icons-material";
import {DeleteMemberOfBoard} from "../../../../../services/boardsService";
import {isAdminOfBoard} from "../../../../../utils/checkMemberRoleOfBoard";
import board from "../../../../../pages/BoardPage/Board";

console.log(Object.values(memRoles), "....");

const useStyles = makeStyles({
    root: {
        maxWidth: '8rem',
        opacity: '70%'
    },
});

const ChipComponent = (props) => {
    const {name, surname, email, callback} = props;
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

// const roles = [
// 	{
// 		id:new Date() +4,
// 		name:'owner'
// 	},
// 	{
// 		id:new Date() +9,
// 		name:'member'
// 	}
// ]


const InviteMembers = ({listMember}) => {
    const [memberMail, setMemberMail] = useState('');
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();
    const boardMembers = useSelector((state) => state.board.members);
    const boardId = useSelector(state => state.board.id);
    const {userInfo} = useSelector(state => state.user);
    const isAdminInBoard=isAdminOfBoard(userInfo._id,boardMembers)

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

    const handleInviteClick = async () => {
        await boardMemberAdd(boardId, members, dispatch);
        setMembers([]);
    }
    const {id} = useParams()

    const changeRole = async (e, idMember, idBoard) => {

        await changeRoleUser(e.target.value, dispatch, idMember, idBoard);

    }


    const DeleteMemberInBoard=async (idMember)=>{
        if(isAdminInBoard){
            const personDeleted=isAdminOfBoard(idMember,boardMembers)
            if(personDeleted){
              alert("you don't have permission to delete")
            }
            await deleteMemberInBoard(idMember,boardId,dispatch)
        }else {
            alert("you don't have permission to delete")
        }

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
                <Button title='Add' style={{flex: '1'}} clickCallback={handleAddClick}/>
            </SearchContainer>


            {listMember.map(member => (
                    <div key={member._id} style={{display: 'flex'}}>
                        <span>{member.name}</span>
                        <select defaultValue={member.role} onChange={async (e) => {
                            {
                                await changeRole(e, member._id, id)
                            }
                        }}>
                            {Object.values(memRoles).map((role, index) => {
                                if(member?.role==='Admin'){
                               return <option value={role} key={index}  >{role} </option>
                            }
                            return <option value={role} key={index} >{role}</option>
                            })}
                        </select>
                            {member?.role!=="Admin" &&
                                <button onClick={()=>DeleteMemberInBoard(member._id)} >Delete</button>
                            }
                    </div>
                )
            )}


            <ChipContainer>
                {members.map((member) => {
                    return <ChipComponent key={member.email} callback={handleDelete} {...member} />;
                })}
            </ChipContainer>
            {members.length > 0 && <Button clickCallback={handleInviteClick} title='Invite'/>}
        </Container>
    );
};

export default InviteMembers;
