import React from 'react';
import styled from "styled-components";
import MediaCard from "./CardCenterHome";

const Container = styled.div`
  width: 34%;
  margin-top: 40px;
  margin-left:5px;
`
const WrapperMain = styled.div`
  width: 100%;
  height:auto;
  border-radius: 3px;
`

const ImageDiv = styled.div`
  border-radius: 5px;
  margin: 2px;

`

const Image = styled.img`
  width: 100%;
  height: 250px;
`

const ContentMain = styled.div`
  margin: 10px;
`

const Tittle = styled.p`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 8px;
`

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`


const HomeCenter = () => {
    return (
        <Container>
            <WrapperMain>
                <MediaCard/>
            </WrapperMain>
        </Container>
    );
};

export default HomeCenter;