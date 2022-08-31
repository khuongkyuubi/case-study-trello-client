import {
    Avatar, Body,
    Button,
    Container, ContentWrapper,
    Header,
    LeftSideHeader,
    Nav,ButtonWrapper,
    RightSideHeader,
    TeamDetails,
    TopHeader
} from "./Styled";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Navbar from "../../components/Navbar";
import {useSelector} from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import {useEffect, useState} from "react";
import SettingUserInfo from "../../components/settingUser/SettingUserInfo";
import {IconButton} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
function Settings() {
    const {userInfo} = useSelector(state => state.user)
    const {listTeamData} = useSelector(state => state.boardInTeam)
    const [avatar,setAvatar] = useState()
    const [value,setValue] = useState('4')
    const data = new FormData();
    useEffect(() =>{
        if(avatar){
            const filename = "" + Date.now() + avatar?.["name"];
            data.append("name", filename);
            data.append("file", avatar);
        }
        return ()=>{
            avatar && URL.revokeObjectURL(avatar.preview)
        };
    },[avatar])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClick =()=>{
        setValue('4')
    }
    const handlePreviewAvatar = (e)=>{
        const file = e.target.files[0];
        file.preview= URL.createObjectURL(file)
        setAvatar(file)
    }
    return (
        <Container>
            <Nav>
                <Navbar/>
            </Nav>
            <Header>
                {
                    userInfo ?
                        <TopHeader>
                            <LeftSideHeader>
                                {avatar ? <Avatar src={avatar.preview}/> : <Avatar src={'http://localhost:5000/avatars/'+userInfo.avatar}/>}
                                {value==='4'?<ButtonWrapper>
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <input hidden accept="image/*" type="file" onChange={handlePreviewAvatar}/>
                                        <PhotoCamera/>
                                    </IconButton>
                                </ButtonWrapper>:null}
                            </LeftSideHeader>
                            <RightSideHeader>
                                <TeamDetails>
                                  <h1>  {userInfo.name} {userInfo.surname}</h1>{userInfo.email}
                                </TeamDetails>
                                <TeamDetails>
                                    <p>{userInfo.description ? userInfo.description : listTeamData?.length ? `${listTeamData.length} Teams` : 'No Teams'}</p>
                                </TeamDetails>
                                <Button onClick={handleClick} >Edit User Profile</Button>
                            </RightSideHeader>
                        </TopHeader>
                        : (<LoadingScreen/>)
                }

            </Header>
            <Body>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value} >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <ContentWrapper>
                                <TabList
                                    onChange={handleChange} aria-label="secondary tabs example"
                                >
                                    <Tab label="Profile and visibility" value="1" />
                                    <Tab label="Activity" value="2" />
                                    <Tab label="Cards" value="3" />
                                    <Tab label="Settings User" value="4" />
                                </TabList>
                            </ContentWrapper>
                        </Box>
                        <TabPanel value="1">Item One</TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                        <TabPanel value="4"><SettingUserInfo props={data}/></TabPanel>
                    </TabContext>
                </Box>
            </Body>
        </Container>
    )
}

export default Settings