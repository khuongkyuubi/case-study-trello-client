import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Input from '@mui/material/Input';
import * as style from "../../components/modals/modalCreateBoard/Styled"

import '../../Link.css'
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import AddIcon from "@mui/icons-material/Add";
import ChipComponent from "../../components/modals/CreateBoardModal/ChipComponent";
import {useState} from "react";
import {getUserFromEmail, login} from "../../services/userService";
import {useDispatch, useSelector} from "react-redux";
import {boardMemberAdd} from "../../services/boardService";
import {inviteMemberTeam} from "../../services/teamService";
import {useParams} from "react-router-dom";
import {openAlert} from "../../redux/Slices/alertSlice";
const style1 = {
    position: 'absolute',
    top: '38%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 'auto',
    bgcolor: 'background.paper',
   border: '0px solid #000',
    borderRadius:'2px',
    boxShadow: 24,
    p: 4,
    mb:8
};

export default function KeepMountedModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [memberInput, setMemberInput] = useState("");
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();
    const {idTeam} = useParams();
    const {teams} = useSelector(state => state.user)
    const team = teams.filter(team => team._id === idTeam);
    const teamMembers = team[0].members;
    const handleClick = async () => {
        const checkMember = teamMembers.filter((m) => m.email === memberInput)[0];
        if (checkMember) {
            dispatch(
                openAlert({
                    message: `${checkMember.name} is already member of this team!`,
                    severity: 'error',
                })
            )
            setMemberInput('');
            return;
        }
        const newMember = await getUserFromEmail(memberInput, dispatch);
        if (newMember == null) return;
        if (members.filter((member) => member.email === newMember.email).length > 0)
            return;
        setMembers([...members, newMember]);
    };
    const handleDelete = (email) => {
        const newMembers = members.filter((member) => member.email !== email);
        setMembers([...newMembers]);
    };

    const handleInviteClick= async()=>{
        await inviteMemberTeam(idTeam,members,dispatch);
        setMemberInput('');
        setMembers([]);
    }
    return (
        <div>
         <div className="button-invite-member" style={{height:"30px",display:"flex",justifyContent:"center"}}><Button onClick={handleOpen} style={{color:"white",fontSize:"10px"}}>
            <PersonAddAltIcon style={{height:'15px'}}/> <span style={{color:"white",fontSize:"10px"}} >Invite Workspace members</span>
         </Button>
         </div>
    <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style1}>
                    <Typography sx={{ h2: 1 ,fontSize:'20px',fontWeight:'bold'}}>Invite to Workspace</Typography>
                        <style.MemberWrapper>
                            <style.MemberInputWrapper>
                                <style.MemberIcon>
                                    <GroupAddOutlinedIcon fontSize="small"/>
                                </style.MemberIcon>
                                <style.MemberInput
                                    style={{color: 'black'}}
                                    placeholder="Invite to board with email"
                                    value={memberInput}
                                    type="email"
                                    onChange={(e) => setMemberInput(e.target.value)}
                                />
                            </style.MemberInputWrapper>
                            <style.AddButton style={{backgroundColor: '#d7d7d7'}}  onClick={() => handleClick()}>
                                <AddIcon fontSize="small"/>
                            </style.AddButton>
                        </style.MemberWrapper>
                    
                        <style.ChipWrapper style={{backgroundColor: 'white'}} >
                            {members?.map((member) => {
                                return (
                                    <ChipComponent
                                        key={member.email}
                                        callback={handleDelete}
                                        {...member}
                                    />
                                );
                            })}
                        </style.ChipWrapper>
                    {members.length > 0 && <button style={{backgroundColor: '#d7d7d7', padding: '5px 15px', borderRadius: "3px", border: "none"}} className="invite" onClick={handleInviteClick} >Invite</button>}
                    {/*<input type="text"/>*/}
                     <Typography sx={{ p: 1 ,fontSize:'12px',fontWeight:300,mt:'12px'}}>
                         Invite someone to this Workspace with a link
                     </Typography>



                </Box>
    </Modal>

</div>
    );
}