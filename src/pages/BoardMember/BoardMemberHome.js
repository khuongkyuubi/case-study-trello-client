import React, {useEffect, useState} from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Navbar from "../../components/Navbar";
import styled from "styled-components";
import InviteMemberModal from "./ButtonInviteMember";
import {Item, IconItem, ContentItem} from "../Home/HomeLeft"
import LinkIcon from '@mui/icons-material/Link';
import ButtonDetailMember from "./ButtonDetailMember";
import ButtonRoles from "./ButtonRoles";
import ButtonRemove from "./ButtonRemove";
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getListTeam} from "../../services/boardInTeamService";

export const Container = styled.div`
  //margin-top: 3rem;
  //display: flex;
  //flex-direction: column;
  width: 100%;
  //height: 100vh;
  position: absolute;
  top: 2.5rem;
  bottom: 0;
  overflow-y: auto;
`

export const Nav = styled.div`
  //flex: 1;
  width: 100%;
  //height: 100px;
  //position: sticky
`

export const WrapperContent = styled.div`
  flex: 17;
  margin-top: 3.5%;
`

export const DivTop = styled.div`
  width: 100%;
  height: 13%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const WrapperTitle = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
`
export const DivTitle = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
`
export const IconName = styled.div`
  width: 7%;
  height: 100%;
  background-color: #c85189;
  margin-left: 7%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 30px;
  font-weight: bold;
`
export const ContentTitle = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  padding-left: 3%;

  //justify-content: space-between;
`
export const NameProject = styled.div`
  width: 45%;
  height: 100%;
  font-size: 18px;
`

export const DetailName = styled.div`
  display: flex;
`
export const Name = styled.div`
  margin-right: 8px;
  font-weight: bold;
`

export const IconEditName = styled.button`
  border: none;
  background-color: #ffffff;
  border-radius: 10px;

  &:hover {
    background-color: #f1ebeb;
  }
`

export const Status = styled.div`
  display: flex;
  font-size: 10px;
  color: #788396;
  width: 100%;
  height: 30%;
`

export const Div1 = styled.div`
`
export const Div2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 5px 8px;
`

export const InviteMember = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`
const DivBottom = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`

const DivLeft = styled.div`
  width: 25%;
  height: 75%;
  display: flex;
  flex-direction: column;
  //justify-content: flex-end;
`

const DivWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ChooseMember = styled.div``

const TitleToChoose = styled.div`
  margin-left: 12px;
  margin-top: 12px;
  color: #788396;
  font-size: 10px;
  font-weight: bold;
`

const DivRight = styled.div`
  width: 75%;
`
const DivContainerDetailMember = styled.div`
  width: 100%;
`

const WrapperContentRight = styled.div`
  width: 100%;
  margin: 30px 0 0 25px;
`
const TitleGuests = styled.div`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 8px;
`

const Descriptions = styled.div`
  margin-bottom: 15px;
  font-size: 12px;
`

const WrapperInvite = styled.div`
  width: 100%;
  display: flex;

`

const InviteLeft = styled.div`
  width: 50%;
`

const TitleInvite = styled.div`
  font-size: 17px;
  font-weight: bold;
`

const DescriptionInvite = styled.div`
  font-size: 12px;
  margin-top: 8px;
`

const DivInputWorkSpace = styled.div`
  margin-left: 2%;
`
const InputFilter = styled.input`
  padding: 5px 0;
  border-radius: 3px;
  border: 2px solid #e6eaee;

  &:hover {
    background-color: #e6eaee;
    cursor: pointer;
    border-radius: 5px;
  }
`
const DivInviteLink = styled.div`
  width: 40%;
  height: 50%;
  display: flex;
  flex-direction: column;
`

const InviteRightTop = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
  padding-right: 15px;
`
const InviteRightBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;

`
const InviteLinkTop = styled.button`
  width: 30%;
  height: 100%;
  border-radius: 3px;
  border: none;
  background-color: #ecfbf3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;

  &:hover {
    background-color: #d2dae1
  }
`
const InviteLinkBottom = styled.button`
  width: 25%;
  height: 100%;
  border-radius: 3px;
  border: none;
  background-color: #e6eaee;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;

  &:hover {
    background-color: #d2dae1
  }
`

const IconInvite = styled.span`
  color: #4c5c76;
`

const ContentInvite = styled.span`
  color: #4c5c76;
  font-size: 11px;

`

const ListFriends = styled.div`
  width: 90%;
  height: 33px;
  display: flex;
`

const Avatar = styled.div`
  width: 3%;
  background-color: red;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: bold;
`

const NameAcc = styled.div`
  width: 58%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`

const Account = styled.div`
  font-size: 14px;
  font-weight: bold;
`
const Email = styled.div`
  color: #788396;
  font-size: 12px;
`

const Edit = styled.div`
  width: 37%;
  display: flex;
`

const Detail = styled.div`
  width: 33.33%;
`
const Roles = styled.div`
  width: 33.33%;
`

const Remove = styled.div`
  width: 33.33%;
`

export const DivHr = styled.div`
  width: 90%;
  margin-left: 3%;
`

const TalkWarning = styled.div`
  width: 90%;
  margin-left: 40%;
`


const BoardMemberHome = () => {
    const dispatch = useDispatch();
    const [backgroundWorkSpace, setBackgroundWorkSpace] = useState('')
    const [backgroundGuests, setBackgroundGuests] = useState('')
    const [backgroundPending, setBackgroundPending] = useState('')
    useEffect(() => {
        setBackgroundWorkSpace('#e6eaee')
    }, [])
 const {idTeam} = useParams();
    const {listTeamData} = useSelector(state => state.boardInTeam)
    const team = listTeamData.filter(team => team._id === idTeam)

    const [guests, setGuests] = useState(false)
    const [pendding, setPendding] = useState(false)
    const [workspaces, setWorkSpaces] = useState(true)
    const [invite, setInvite] = useState(false)

    const handleGuests = () => {
        setPendding(false)
        setWorkSpaces(false)
        setGuests(true)
        setBackgroundGuests('#e6eaee')
        setBackgroundPending('')
        setBackgroundWorkSpace('')
    }
    const handlePending = () => {
        setGuests(false)
        setWorkSpaces(false)
        setPendding(true)
        setBackgroundPending('#e6eaee')
        setBackgroundGuests('')
        setBackgroundWorkSpace('')
    }

    const handleWorkSpaces = () => {
        setGuests(false)
        setPendding(false)
        setWorkSpaces(true)
        setBackgroundWorkSpace('#e6eaee')
        setBackgroundPending('')
        setBackgroundGuests('')
    }

    const handleInvite = () => {
        setInvite(true);
        setTimeout(() => {
            setInvite(false)
        }, 1800)
    }

    useEffect(() => {
        getListTeam(false, dispatch)
    }, [dispatch])


    return (
        <Container>
            <Nav>
                <Navbar/>
            </Nav>
            <WrapperContent>
                <DivTop>
                    <WrapperTitle>
                        <DivTitle>
                            <IconName>
                                D
                            </IconName>

                            <ContentTitle>
                                <NameProject>
                                    <DetailName>
                                        <Name>Dự án C03H_JS</Name>
                                        <IconEditName><DriveFileRenameOutlineIcon
                                            style={{color: "#788396", width: "15px", height: "15px"}}/></IconEditName>
                                    </DetailName>

                                    <Status>
                                        <Div1>Premium</Div1>
                                        <Div2>
                                            <LockOpenIcon style={{width: "10px", marginRight: "3px"}}/>
                                            <span>Private</span>
                                        </Div2>
                                    </Status>
                                </NameProject>


                                <InviteMember>
                                    < InviteMemberModal/>
                                </InviteMember>
                            </ContentTitle>
                        </DivTitle>
                    </WrapperTitle>
                </DivTop>

                <DivHr>
                    <hr/>
                </DivHr>

                <DivBottom>
                    <DivLeft>
                        <DivWrapper>
                            <ChooseMember>
                                <h3>Member</h3>
                                <TitleToChoose>Members of Workspace boards</TitleToChoose>
                                <Item onClick={handleWorkSpaces} style={{backgroundColor: backgroundWorkSpace}}>
                                    <ContentItem>Workspace members<span>({team[0]?.members.length})</span></ContentItem>
                                </Item>
                                <Item onClick={handleGuests} style={{backgroundColor: backgroundGuests}}>
                                    <ContentItem>Guests</ContentItem>
                                </Item>

                                <Item onClick={handlePending} style={{backgroundColor: backgroundPending}}>
                                    <ContentItem>Pending</ContentItem>
                                </Item>
                            </ChooseMember>
                        </DivWrapper>
                    </DivLeft>

                    {workspaces &&
                        <DivRight>
                            <WrapperContentRight>
                                <TitleGuests>Workspace members<span>({team[0]?.members.length})</span></TitleGuests>
                                <Descriptions>Workspace members can view and join all Workspace visible boards and
                                    create new boards in the Workspace. Adding new members will automatically update
                                    your billing.</Descriptions>
                            </WrapperContentRight>

                            <DivHr>
                                <hr/>
                            </DivHr>

                            < WrapperContentRight>
                                <WrapperInvite>
                                    <InviteLeft>
                                        <TitleInvite>Invite members to join you</TitleInvite>
                                        <DescriptionInvite>
                                            Anyone with a unique link can join this Workspace, with 3 boards. You’ll be
                                            billed for each member added.
                                            You can disable, and create a new link for this Workspace at any time.
                                        </DescriptionInvite>
                                    </InviteLeft>

                                    <DivInviteLink>

                                        {invite && <InviteRightTop>
                                            <InviteLinkTop>
                                                <span style={{color: '#8dbe89', fontSize: '10px'}}>Link copied to success</span>
                                            </InviteLinkTop>
                                        </InviteRightTop>
                                        }

                                        <InviteRightBottom>

                                            <InviteLinkBottom onClick={handleInvite}>
                                                <ContentInvite>Invite with link</ContentInvite>
                                            </InviteLinkBottom>

                                        </InviteRightBottom>

                                    </DivInviteLink>
                                </WrapperInvite>
                            </WrapperContentRight>


                            <DivHr>
                                <hr/>
                            </DivHr>
                            <DivInputWorkSpace>
                                <InputFilter placeholder="Filter by name"/>
                            </DivInputWorkSpace>

                            <DivHr>
                                <hr/>
                            </DivHr>

                            {team[0]?.members.map(member => (
                                < DivContainerDetailMember key={member._id}>
                                    <WrapperContentRight>
                                        <ListFriends>
                                            <Avatar><span>{member.name.charAt(0).toUpperCase()}</span></Avatar>
                                            <NameAcc>
                                                <Account>{member.name}</Account>
                                                <Email>{member.email}</Email>
                                            </NameAcc>
                                            <Edit>
                                                <Detail>
                                                    <ButtonDetailMember/>
                                                </Detail>
                                                <Roles>
                                                    <ButtonRoles/>
                                                </Roles>
                                                <Remove>
                                                    <ButtonRemove/>
                                                </Remove>

                                            </Edit>
                                        </ListFriends>
                                    </WrapperContentRight>
                                    <DivHr>
                                        <hr/>
                                    </DivHr>
                                </DivContainerDetailMember>
                            ))}


                        </DivRight>}


                    {guests && <DivRight>
                        <WrapperContentRight>
                            <TitleGuests>Guests<span>(0)</span></TitleGuests>
                            <Descriptions>Guests can only view and edit the boards to which they've been
                                added.</Descriptions>
                            <InputFilter placeholder="Filter by name"/>
                        </WrapperContentRight>
                        <DivHr>
                            <hr/>
                        </DivHr>
                        <TalkWarning>There are no guests in this Workspace.</TalkWarning>
                    </DivRight>}

                    {pendding && <DivRight>
                        <WrapperContentRight>
                            <TitleGuests>Pending<span>(0)</span></TitleGuests>
                            <Descriptions>These people have requested to join this Workspace. Adding new Workspace
                                members will automatically update your bill.</Descriptions>
                            <InputFilter placeholder="Filter by name"/>
                        </WrapperContentRight>
                        <DivHr>
                            <hr/>
                        </DivHr>
                        <TalkWarning>There are no pending requests.</TalkWarning>
                    </DivRight>
                    }
                </DivBottom>
            </WrapperContent>
        </Container>
    );
};

export default BoardMemberHome;