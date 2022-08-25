import {
    Avatar, BotHeader,
    Button,
    Container,
    Header,
    LeftSideHeader,
    Nav,
    RightSideHeader,
    TeamDetails,
    TopHeader
} from "./Styled";
import Navbar from "../../components/Navbar";
import {useSelector} from "react-redux";
import LoadingScreen from "../../components/LoadingScreeen";

function Settings() {
    const {userInfo} = useSelector(state => state.user)

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
                                {userInfo.avatar ? <Avatar src={userInfo.avatar}/> : <Avatar src='./girl5.jpg'/>}
                            </LeftSideHeader>
                            <RightSideHeader>
                                <TeamDetails>
                                  <h1>  {userInfo.name} Cruise</h1>{userInfo.email}
                                </TeamDetails>
                                <TeamDetails>
                                    <p>{userInfo.description ? userInfo.description : 'No Teams'}</p>
                                </TeamDetails>
                                <Button>Edit Team Profile</Button>
                            </RightSideHeader>
                        </TopHeader>
                        : (<LoadingScreen/>)
                }
                <BotHeader>
                    <h1>Bot</h1>
                </BotHeader>
            </Header>
        </Container>

    )
}

export default Settings