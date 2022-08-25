import React from 'react';
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
  padding:5px;
`

const Submit=styled.button`
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
                    <DivWrapper>
                        <Setting>Settings</Setting>
                        <Change>
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