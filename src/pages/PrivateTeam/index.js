import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getBoards} from "../../services/boardsService";
import LoadingScreen from "../../components/LoadingScreen";
import Navbar from "../../components/Navbar";
import HomeLeft from "../Home/HomeLeft";
import HomeRight from "../Home/HomeRight";
import HomeCenterPrivateTeam from "./HomeCenterPrivateTeam";

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 2.5rem;
  bottom: 0;
  overflow-y: auto;

`
const Nav = styled.div`
  width: 100%;
  position: sticky;
  //flex: 1
`
const Wrapper = styled.div`
  //flex: 6;
  display: flex;
  width: 100%;
`
const ContentLeft1 = styled.div`
  width: 10%;
`
const ContentRight2 = styled.div`
  width: 16%;
`
const PrivateTeam = () => {

    return (
        <>
            <Container>
                <Nav>
                    <Navbar/>
                </Nav>
                <Wrapper>
                    <ContentLeft1/>
                    <HomeLeft/>
                    <HomeCenterPrivateTeam/>
                    <HomeRight/>
                    <ContentRight2/>
                </Wrapper>
            </Container>
        </>
    );
};

export default PrivateTeam;