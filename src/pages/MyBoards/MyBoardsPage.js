import React, {useState} from 'react';
import styled from "styled-components";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Navbar from "../../components/Navbar";
import HomeLeft from "../Home/HomeLeft";
import {CreateBoards} from "../Boards/BoardsWorkSpace";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {useNavigate, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import {useSelector} from "react-redux";
import board from "../BoardPage/Board";
import {Card, Cards, NameWorkSpaceRecently} from "../Boards/MyBoards";
import CreateBoardInTeam from "../../components/modals/CreateBoardInTeamModal/CreateBoardInTeam";
import LoadingScreen from "../../components/LoadingScreen";

const Container = styled.div`
  //margin-top: 1rem;
  width: 100%;
  //height: 100%;
  //display: flex;
  //flex-direction: column;
  position: absolute;
  top: 2.5rem;
  bottom: 0;
  overflow-y: auto;
`
const Nav = styled.div`
  //width: 100%;
  //position: sticky;
  ////flex: 1
`

const Wrapper = styled.div`
  //margin-top:3%;
  //flex: 6;
  display: flex;
  width: 100%;
`
const BoardsContent = styled.div`
  display: flex;
  width: 70%;
  height: auto;
  margin-top: 35px;
  flex-direction: column;
`

const DivTop = styled.div`
  margin-bottom: 25px;
`

const YourBoard = styled.div`
  display: flex;
  align-items: center;
`

const DivCard = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const NameBoard = styled.div`
  font-weight: bold;
  color: #ffffff;
`

const IconBoard = styled.div`
  margin: 5px 5px 5px 20px;
`

const DefaultName = styled.div`
  font-size: 16px;
  font-weight: bold;
`

const DivEmpty = styled.div`
  width: 10%;
`

const MyBoardsPage = () => {
    const {idTeam}=useParams();
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false);

    const handleCreateBoard = () => {
        navigate(`/create-board`)
    }


    const {pending, boardsData} = useSelector((state) => state.boards);
    const handleModalClose = () => {
        setOpenModal(false);
    };



    return  (
        <>
        {pending && <LoadingScreen/>}
        <Container>
            <Nav>
                <Navbar/>
            </Nav>
            <Wrapper>
                <DivEmpty/>
                <HomeLeft/>
                <BoardsContent>

                    {/*<DivTop>*/}
                    {/*    <YourBoard>*/}
                    {/*        <IconBoard><PersonOutlineIcon/></IconBoard>*/}
                    {/*        <DefaultName>Your boards</DefaultName>*/}
                    {/*    </YourBoard>*/}

                    {/*    <DivCard>*/}
                    {/*        <CreateBoards style={{backgroundColor: '#347a8d'}}>*/}
                    {/*            <NameBoard>AlphaWolf_Trello</NameBoard>*/}
                    {/*        </CreateBoards>*/}

                    {/*        <CreateBoards onClick={handleCreateBoard}>*/}
                    {/*            Create new board*/}
                    {/*        </CreateBoards>*/}
                    {/*    </DivCard>*/}
                    {/*</DivTop>*/}


                    <DivTop>
                        <YourBoard>
                            <IconBoard><PeopleOutlineIcon/></IconBoard>
                            <DefaultName>All boards in this Workspace</DefaultName>
                        </YourBoard>

                        <DivCard>
                            <Cards>
                                {boardsData.map(boardTeam =>{
                                    if(boardTeam?.teams===idTeam){
                                        return (
                                            <Card
                                                link={boardTeam.backgroundImageLink}
                                                isImage={boardTeam.isImage}
                                                onClick={() => navigate(`/board/${boardTeam._id}`)}
                                                key={boardTeam._id}
                                            >
                                                <NameWorkSpaceRecently>{boardTeam.title}</NameWorkSpaceRecently>
                                            </Card>
                                        )}
                                })}

                                <CreateBoards onClick={() => setOpenModal(true)}>
                                    create new board
                                </CreateBoards>
                                {openModal && <CreateBoardInTeam idTeam={idTeam} handleModalClose={handleModalClose}/>}
                            </Cards>
                        </DivCard>


                    </DivTop>

                </BoardsContent>
                <DivEmpty/>
            </Wrapper>
        </Container>
        </>
    );
};

export default MyBoardsPage;