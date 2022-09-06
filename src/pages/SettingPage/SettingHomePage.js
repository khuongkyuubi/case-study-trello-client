import React, {useEffect} from 'react';
import styled from "styled-components"
import Navbar from "../../components/Navbar";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import InviteMemberModal from "../BoardMember/ButtonInviteMember";
import {
    Container, Nav, WrapperContent, DivTop, WrapperTitle,
    DivTitle, IconName, ContentTitle, NameProject, DetailName,
    Name, IconEditName, Status, Div1, Div2, InviteMember, DivHr
} from "../BoardMember/BoardMemberHome"
import background from "../../components/Background";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {CloseButton} from "react-bootstrap";
import {TitleWrapper} from "../../components/modals/EditCardModal/Activity/styled";
import {Hr} from "../LoginPage/Styled";
import {ContentWrapper} from "../SettingsUser/Styled";
import {teamRoles} from "../../utils/roles";
import {useState} from "react";
import "../../Link.css"
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeRoleTeam} from "../../services/teamService";


const DivBottom = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const DivWrapper = styled.div`
  width: 45%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Setting = styled.div`
  font-size: 17px;
  font-weight: bold;

`

const Change = styled.div`

`
const Projects = styled.div`
  margin-top: 7px;

`

const Title = styled.div`
  font-weight: bold;
`

const Input = styled.input`
  margin-top: 3px;
  border-radius: 3px;
  padding: 5px;
`

const Submit = styled.button`
  margin-top: 3%;
  margin-left: 10%;
  padding: 5px 8px 5px 8px;
  border-radius: 3px;
  background-color: #026aa7;
  color: #ffffff;

  &:hover {
    background-color: #0478bd
  }
`

const SettingHomePage = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const {idTeam} = useParams();
    const {teamsData} = useSelector(state => state.team);
    const team = teamsData.find(team => team._id === idTeam);
    const rolesTeam = Object.values(teamRoles);
    const [roleTeam, setRoleTeam] = useState(team?.role)


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    useEffect(() => {
        changeRoleTeam(roleTeam, idTeam, dispatch);
    }, [roleTeam])

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
                                            <span>{roleTeam}</span>
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
                    <DivWrapper>
                        <Setting>Settings</Setting>
                        <Change>
                            <h5>Workspace visibility</h5>
                            <hr/>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <div>
                                    <strong style={{fontStyle: "bold"}}>{roleTeam}</strong>
                                    {/*<span>- This Workspace is public. It's visible to anyone with the link and will show up in search engines like Google. Only those invited to the Workspace can add and edit Workspace boards.</span>*/}
                                </div>
                                <div>
                                    <button style={{
                                        backgroundColor: "#f5f6f8",
                                        border: "none",
                                        justifyContent: "center",
                                        padding: "7px 8px"
                                    }} onClick={handleClick}>Change
                                    </button>
                                </div>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <Typography sx={{p: 2, color: "#838ea0"}}>Select Workspace
                                            Visibility</Typography>
                                        <CloseButton style={{marginTop: "10px", fontSize: "1rem"}}
                                                     onClick={() => setAnchorEl(false)}>
                                            {/*<CloseIcon />*/}
                                        </CloseButton>

                                    </div>
                                    <hr style={{marginTop: "-5px", marginLeft: "5px", marginRight: "5px"}}/>
                                    <div style={{display: "flex", flexDirection: "column", marginTop: "-5px"}}>
                                        {rolesTeam?.map((role, index) => (
                                            <button style={{
                                                marginLeft: "5px",
                                                marginRight: "5px",
                                                border: "none",
                                                marginBottom: "3px",
                                                backgroundColor: "white"
                                            }} className="selectRole" onClick={(e) => {
                                                setRoleTeam(role)
                                                setAnchorEl(false);

                                            }
                                            }
                                                    key={index}>
                                                {role}
                                            </button>
                                        ))}
                                    </div>

                                </Popover>
                            </div>

                            <Projects>
                                <Title>Name</Title>
                                <Input placeholder="nguyen hai phu"></Input>
                            </Projects>

                            <Projects>
                                <Title>Description</Title>
                                <Input placeholder="alo alo"></Input>
                            </Projects>

                            <Submit>Submit</Submit>

                        </Change>

                    </DivWrapper>
                </DivBottom>
            </WrapperContent>

        </Container>
    );
};

export default SettingHomePage;