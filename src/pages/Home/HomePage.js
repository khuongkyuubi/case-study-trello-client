import React, {useEffect} from 'react';
import styled from "styled-components";
import Navbar from "../../components/Navbar2";
import HomeLeft from "./HomeLeft";
import HomeCenter from "./HomeCenter";
import HomeRight from "./HomeRight";
import LoadingScreen from "../../components/LoadingScreen";
import {useDispatch, useSelector} from "react-redux";
import {getBoards} from "../../services/boardsService";
import {useLocation} from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Nav = styled.div`
  width: 100%;
  position: sticky;
  flex: 1
`
const Wrapper = styled.div`
  margin-top:5%;
  flex: 6;
  display: flex;
  width: 100%;
`
const ContentLeft1 = styled.div`
  width: 10%;
`
const ContentRight2 = styled.div`
  width: 16%;
`
const HomePage = () => {

    const {pending, boardsData} = useSelector((state) => state.boards);
    const dispatch = useDispatch();

    useEffect(() => {
        getBoards(false, dispatch)
    }, [dispatch])

    return (
        <>
            {pending && <LoadingScreen/>}
            <Container>
                <Nav>
                    <Navbar/>
                </Nav>
                <Wrapper>
                    <ContentLeft1/>
                    <HomeLeft/>
                    <HomeCenter/>
                    <HomeRight/>
                    <ContentRight2/>
                </Wrapper>
            </Container>
        </>
    );
};

export default HomePage;