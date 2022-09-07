import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import 'react-dropdown/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from "@mui/icons-material/Add";
import NestedList from "./MenuWorkSpaces";
import BasicList from "./ListButton";

import * as style from "../../components/modals/modalCreateBoard/Styled";
import {teamRoles} from "../../utils/roles"


import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import {getUserFromEmail} from "../../services/userService";
import {useDispatch, useSelector} from "react-redux";
import ChipComponent from "../../components/modals/CreateBoardModal/ChipComponent";
import {createTeam, getTeams} from "../../services/teamService";
import {useNavigate} from "react-router-dom";
import TeamsList from "./TeamsList";
import {getListTeam} from "../../services/boardInTeamService";
import {getBoards} from "../../services/boardsService";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ContentLeft2 = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  margin-top: 3px;
`

const DivItem = styled.div`
  margin-top: 30px;
`

const WrapperItem = styled.ul`
  width: 75%;
`

export const Item = styled.li`
  display: flex;
  align-items: center;
  margin: 6px 0;
  padding: 8px;


  &:hover {
    background-color: #e6eaee;
    cursor: pointer;
    border-radius: 5px;
  }
`
export const IconItem = styled.span`
  margin: 0 5px;
  color: #42526e;
`

export const ContentItem = styled.span`
  font-weight: bold;
  font-size: 12px;

`


const DivProject = styled.div`

`

const Workspace = styled.div`
  display: flex;
  color: #42526e;
  width: 80%;
  font-weight: 300;
  justify-content: space-around;
`

const ContentWorkspace = styled.div`
  margin-left: 9.3%;
  font-size:16px;
  font-weight:380;
  
`
const IconWorkspace = styled.button`
  border: none;
  border-radius: 4px;
  color: #42526e;
  cursor: pointer;
  margin-left: 5%;

  &:hover {
    background-color: #e6eaee;
    cursor: pointer;

  }
`

const ProjectOld = styled.div`
  margin: 12px 0px;
  width: 75%;
  padding-left: 30px;
`


export const IconProject = styled.div`
  width: 21px;
  height: 21px;
  display: flex;
  margin-left: 10px;
  margin-right: 7px;
  justify-content: center;
  color: white;
  border-radius: 3px;
  font-weight: bold;
  background: linear-gradient(#b22865, #cd5a91)
`


const CreateWorkSpace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
`

const WrapperWorkSpace = styled.div`
  height: 550px;
  width: 1000px;
  //margin-top: 5px;
  background-color: #6554a2;;
  display: flex;
  gap: 20px;
  position: relative;
  border-radius: 3px;
`
const LeftCreateSPace = styled.div`
  width: 50%;
  height: 100%;



`

const ContentWorkSpace = styled.div`
  margin: 35px;

`


const Tittle = styled.div`
  color: #091e42;
  font-size: 18px;
  font-weight: bold;
`

const Desc1 = styled.div`
  color: #8e98a8;
`

const WorkspaceName = styled.div`
  margin-top: 15px;
  font-weight: bold;
`
const InputName = styled.input`
  margin-top: 3px;
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border-color: #f5f6f8;

`

const SelectRoles = styled.select`
  margin-top: 3px;
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border-color: #f5f6f8;
`
const OptionRoles = styled.option`
  width: 100%;
  padding: 5px;
  border-color: #f5f6f8;
  background-color: white;
  
`

const Desc2 = styled.div`
  font-size: 10px;
  margin-top: 3px;
  color: #7f8285;
`

const WorkspaceDesc = styled.div`
  margin-top: 15px;
`

const TextArea = styled.textarea`
  border-radius: 4px;
  width: 100%;
  border-color: #f5f6f8;

`

const Desc3 = styled.div`
  color: #7f8285;
  font-size: 10px;
  margin-bottom: 3px;
`
const DivButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonSubmit = styled.button`
  margin-top: 8px;
  background-color: #ffffff;
  width: 100%;
  padding: 7px;
  border-radius: 4px;
  border-color: #f5f6f8;
`


const RightCreateSPace = styled.div`
  width: 50%;
  height: 100%;

`
const ImageTrello = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 3px;

`

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 17px;
  font-weight: bold
`
const style1 = {
    width: 'auto',
    height: 'auto',
    position: 'absolute',
    top: '21%',
    left: '21%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const HomeLeft = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const [memberInput, setMemberInput] = useState("");
    const [members, setMembers] = useState([]);
    const [createWorkSpace, setCreateWorkSpace] = useState(false)
    const [form, setForm] = useState({})
    const {listTeamData} = useSelector(state => state.boardInTeam)
    // console.log(listTeamData)
    const [roleTeam, setRoleTeam] = useState("Private")

    const {teamsData}=useSelector(state =>state.team)
    const {boards} =useSelector(state =>state.boards)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const rolesTeam = Object.values(teamRoles);


    const handleClick = async () => {
        const newMember = await getUserFromEmail(memberInput, dispatch);
        console.log(newMember,'.......')
        if (newMember == null) return;
        if (members.filter((member) => member.email === newMember.email).length > 0)
            return;
        setMembers([...members, newMember]);
    };

    const handleDelete = (email) => {
        const newMembers = members.filter((member) => member.email !== email);
        setMembers([...newMembers]);
    };

    const handleCreateTeam = async () => {
        const data = {
            ...form,
            members,
            roleTeam
        }
        // console.log(data)
        await createTeam(data, dispatch,navigate)
        setCreateWorkSpace(false)
        setOpen(false)

    }

    useEffect(() => {
        getListTeam(false,dispatch)
        getTeams(false,dispatch)
        getBoards(false, dispatch)
    },[dispatch])

    return (
        <ContentLeft2>
            <DivItem>
                <WrapperItem>
                    <BasicList/>
                </WrapperItem>
            </DivItem>

            <DivProject>
                <Workspace>
                    <ContentWorkspace>Workspaces</ContentWorkspace>
                    <IconWorkspace>
                        <AddIcon onClick={() => {
                            setCreateWorkSpace(true)
                            setOpen(true);
                        }}/>
                    </IconWorkspace>
                </Workspace>

                <ProjectOld>
                    {teamsData?.length > 0 && teamsData?.map((team, index) => (
                        <TeamsList team={team} key={index}/>
                    ))}
                </ProjectOld>
            </DivProject>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >


                <Box sx={style1}>
                    <WrapperWorkSpace >
                <LeftCreateSPace>
                    <Close onClick={() => {
                        setOpen(false);
                        setCreateWorkSpace(false)}}>X</Close>
                    <ContentWorkSpace>
                        <Tittle>Let's build a Workspace</Tittle>
                        <Desc1>
                            Boost your productivity by making it easier for everyone to access boards in one
                            location.
                        </Desc1>

                        <WorkspaceName>Workspace name</WorkspaceName>
                        <InputName placeholder="Taco's Co." name="name" onChange={handleChange}></InputName>
                        <Desc2>This is the name of your company, team or organization.</Desc2>

                        <WorkspaceDesc>Workspace description</WorkspaceDesc>
                        <TextArea name="description" onChange={handleChange}
                                  placeholder="Our team organizes everything here." rows="4"></TextArea>

                        <WorkspaceDesc>Visibility</WorkspaceDesc>
                        <SelectRoles name="role" onChange={(e)=>setRoleTeam(e.target.value)}>
                            {rolesTeam.map((role, index) => (
                                <OptionRoles value={role} key={index} >{role}</OptionRoles>
                            ))}
                        </SelectRoles>

                        <Desc3>Get your members on board with a few words about your Workspace.</Desc3>



                        <style.MemberWrapper>
                            <style.MemberInputWrapper>
                                <style.MemberIcon>
                                    <GroupAddOutlinedIcon fontSize="small"/>
                                </style.MemberIcon>
                                <style.MemberInput

                                    placeholder="Invite to board with email"
                                    value={memberInput}
                                    type="email"
                                    onChange={(e) => setMemberInput(e.target.value)}
                                />
                            </style.MemberInputWrapper>
                            <style.AddButton onClick={() => handleClick()}>
                                <AddIcon fontSize="small"/>
                            </style.AddButton>
                        </style.MemberWrapper>

                        <style.ChipWrapper>
                            {members.map((member) => {
                                return (
                                    <ChipComponent
                                        key={member.email}
                                        callback={handleDelete}
                                        {...member}
                                    />
                                );
                            })}
                        </style.ChipWrapper>


                        <DivButton>
                            <ButtonSubmit onClick={handleCreateTeam}>Create team</ButtonSubmit>
                        </DivButton>

                    </ContentWorkSpace>

                </LeftCreateSPace>


                <RightCreateSPace>
                    <ImageTrello src="https://wiki.tino.org/wp-content/uploads/2021/07/word-image-981.png"/>
                </RightCreateSPace>
                    </WrapperWorkSpace>
                {/*</CreateWorkSpace>*/}
                </Box>
            </Modal>
        </ContentLeft2>
    );
};
export default HomeLeft;