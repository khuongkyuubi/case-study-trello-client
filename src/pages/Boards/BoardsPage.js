import React from 'react';
import styled from "styled-components";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Navbar from "../../components/Navbar";
import HomeLeft from "../Home/HomeLeft";
import BoardsRecently from "./BoardsRecently";
import BoardsWorkSpace from "./BoardsWorkSpace";
import LoadingScreen from "../../components/LoadingScreen";
import {useSelector} from "react-redux";


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: "Times New Roman", Times, serif;

`
const Nav = styled.div`
  width: 100%;
  position: sticky;
  flex: 1
`

const Wrapper = styled.div`
  flex: 6;
  display: flex;
  width: 100%;
`
const BoardsContent = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 35px;
  flex-direction: column;
`


const DivEmpty = styled.div`
  width: 16%;
`

const BoardsPage = () => {
    const { pending, boardsData } = useSelector((state) => state.boards);

    return (
        <>
            {pending && <LoadingScreen/>} <Container>
            <Nav>
                <Navbar/>
            </Nav>
            <Wrapper>
                <DivEmpty/>

                <HomeLeft/>

                <BoardsContent>
                    <BoardsRecently/>
                    {/*<BoardsWorkSpace/>*/}
                </BoardsContent>

                <DivEmpty/>
            </Wrapper>
        </Container>
        </>
    );
};

export default BoardsPage;