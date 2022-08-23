import React from 'react';
import styled from "styled-components";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';

import Navbar from "../../components/Navbar";
import HomeLeft from "./HomeLeft";
import HomeCenter from "./HomeCenter";
import HomeRight from "./HomeRight";


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

const ContentLeft1 = styled.div`
  width: 16%;
`








const ContentRight2 = styled.div`
  width: 16%;
`


const HomePage = () => {
    return (
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
    );
};

export default HomePage;