import React, {useState} from 'react';
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AppsIcon from '@mui/icons-material/Apps';
import PollIcon from '@mui/icons-material/Poll';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
`

const Nav = styled.div`
  width: 100%;
  display: flex;
  color: #FFFFFF;
  background-color: #026AA7;
  font-weight: bold;
`

const LogoApp = styled.div`
  flex: 0.3;
  display: flex;
  height: 32px;

  align-items: center;
  justify-content: center;
  margin-top: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    border-radius:5px;
  }
`
const Span1 = styled.span``

const LogoTrello = styled.div`
  flex: 0.3;
  height: 32px;
  margin-top: 9px;
	padding:0 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    border-radius:5px;
  }
`

const IconLogoTrello = styled.div`
	align-items: center;
`

const ContentLogoTrello = styled.div`
	margin-top:5px;
	font-size:20px
`


const NavCenter = styled.div`
  flex: 7;
  display: flex;
  width: 100%;
`

const DivItem = styled.div`
  flex: 3.15;
  display: flex;
  justify-content: center;
`

const WrapperItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-weight: 360;
  font-size: 15px;
  margin: 6px 7px;
  background-color: #026AA7;
  color: #FFFFFF;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    border-radius:5px;
  }

`
const ContentItem = styled.span`

`

const IconItem = styled.span`

`


const DivCreate = styled.div`
  flex: 0.5;
  display: flex;
  height:32px;
 margin:7px 0;
  align-items: center;
  justify-content: center;
	background-color:#014a75;
	border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    border-radius:5px;
  }

`

const Create = styled.div`
font-weight: 400;
	
font-size:18px;
	align-items: center;
`


const Search = styled.div`
  flex: 5.75;
  display: flex;
  margin-top: 10px;
  height: 32px;
  justify-content: flex-end;
  width: 220px;


`

const IconSearch = styled.span`
  display: flex;
  align-items: center;
`

const InputSearch = styled.input`
  border: none;
  border-radius:5px;
  margin-right: 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    border-radius:5px;
  }
`


const NavRight = styled.div`
  flex: 0.6;
  display: flex;
  justify-content: center;
  
`
const Info = styled.button`
border:none;
  background-color:#026AA7;
  height:37px;
  margin:5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    border-radius:5px;
  }
`
const IconInfo=styled.span`
color:#ffff;
`

const Notification = styled.button`
  border-radius:5px;
  height:37px;
  border:none;
  margin-top:5px;
  background-color:#EB5A46;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    border-radius:5px;
  }
`
const NotificationIcon=styled.div`
  color:#ffff;
`

const Avatar=styled.span`
  height:37px;
  margin: 5px;
  background-color:#172B4D ;
  border-radius:50%;
  display:flex;
  align-items: center;
  padding: 0 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    border-radius:5px;
  }
`

const Navbar = () => {
    const navigate=useNavigate()
    const [inputL, setInputLong] = useState('');

    const MakeInputLong = () => {
        setInputLong('100%')
    }
    const MakeInputShort = () => {
        setInputLong('220px')
    }
    return (
        <Container>
            <Nav>
                <LogoApp>
                    <Span1><AppsIcon/></Span1>
                </LogoApp>

                <LogoTrello onClick={()=>navigate('/home')}>
                    <IconLogoTrello><PollIcon/></IconLogoTrello>
                    <ContentLogoTrello>Trello</ContentLogoTrello>
                </LogoTrello>

                <NavCenter>
                    <DivItem>
                        <WrapperItem>
                            <ContentItem>Workspaces</ContentItem>
                            <IconItem><KeyboardArrowDownIcon/></IconItem>
                        </WrapperItem>

                        <WrapperItem>
                            <ContentItem>Recent</ContentItem>
                            <IconItem><KeyboardArrowDownIcon/></IconItem>
                        </WrapperItem>

                        <WrapperItem>
                            <ContentItem>Starred</ContentItem>
                            <IconItem><KeyboardArrowDownIcon/></IconItem>
                        </WrapperItem>

                        <WrapperItem>
                            <ContentItem>Templates</ContentItem>
                            <IconItem><KeyboardArrowDownIcon/></IconItem>
                        </WrapperItem>
                    </DivItem>

                    <DivCreate>
                        <Create>Create</Create>
                    </DivCreate>

                    <Search>
                        <IconSearch>
                            <SearchIcon/>
                        </IconSearch>
                        <InputSearch
                            style={{width: inputL}}
                            type="text" placeholder="Search"
                            onFocus={MakeInputLong}
                            onBlur={MakeInputShort}>

                        </InputSearch>
                    </Search>

                </NavCenter>

                <NavRight>
                    <Info>
                        <IconInfo><InfoIcon/></IconInfo>
                    </Info>

                    <Notification>
                        <NotificationIcon>
                            <NotificationsIcon/>
                        </NotificationIcon>
                    </Notification>

                    <Avatar>
                               TFD
                    </Avatar>
                </NavRight>

            </Nav>
        </Container>
    );
};

export default Navbar;