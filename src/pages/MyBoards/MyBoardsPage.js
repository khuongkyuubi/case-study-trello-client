import React from 'react';
import styled from "styled-components";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Navbar from "../../components/Navbar2";
import HomeLeft from "../Home/HomeLeft";
import {CreateBoard} from "../Boards/BoardsWorkSpace";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Link, useNavigate} from "react-router-dom";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';


const Container = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  //font-family: "Times New Roman", Times, serif;

`
const Nav = styled.div`
  width: 100%;
  position: sticky;
  flex: 1
`

const Wrapper = styled.div`
  margin-top:3%;
  flex: 6;
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
    const navigate = useNavigate()
    const handleCreateBoard = () => {
        navigate(`/create-board`)
    }


    return (
        <Container>
            <Nav>
                <Navbar/>
            </Nav>
            <Wrapper>
                <DivEmpty/>
                <HomeLeft/>


                <BoardsContent>
                    <DivTop>
                        <YourBoard>
                            <IconBoard><PersonOutlineIcon/></IconBoard>
                            <DefaultName>Your boards</DefaultName>
                        </YourBoard>

                        <DivCard>
                            <CreateBoard style={{backgroundColor: '#347a8d'}}>
                                <NameBoard>AlphaWolf_Trello</NameBoard>
                            </CreateBoard>



                            <CreateBoard onClick={handleCreateBoard}>
                                Create new board
                            </CreateBoard>

                        </DivCard>

                    </DivTop>


                    <DivTop>
                        <YourBoard>
                            <IconBoard><PeopleOutlineIcon/></IconBoard>
                            <DefaultName>All boards in this Workspace</DefaultName>
                        </YourBoard>

                        <DivCard>
                            <CreateBoard style={{backgroundColor: '#347a8d'}}>
                                <NameBoard>AlphaWolf_Trello</NameBoard>
                            </CreateBoard>

                            <CreateBoard style={{backgroundColor: '#347a8d'}}>
                                <NameBoard>AlphaWolf_Trello</NameBoard>
                            </CreateBoard>

                            <CreateBoard onClick={handleCreateBoard}>
                                Create new board
                            </CreateBoard>

                        </DivCard>

                    </DivTop>


                </BoardsContent>
                <DivEmpty/>
            </Wrapper>
        </Container>
    );
};

export default MyBoardsPage;